const userModel = require("../database/models/user");
const stripe = require('stripe')(process.env.STRIPE_SK)
const subscriptionService = require('../services/subscriptionService');
const subscriptionModel = require("../database/models/subscription");


const createStripeConnectAccount = async (req, res) => {

    // only gym owners can onboard to stripe
    if (req.user.role !== 'gym_owner') {
        return res.status(403).send("unauthorized")
    }

    let user = await userModel.findById(req.user.id)
    let stripe_account_id = user.stripe_account_id

    // stripe account id can be created once per gym owner
    let stripeAccount = null
    if (!stripe_account_id || stripe_account_id == null || stripe_account_id == undefined) {
        const account = await stripe.accounts.create({ type: 'express' });
        const owner = await userModel.findByIdAndUpdate(req.user.id, { stripe_account_id: account.id }, { new: true })
        stripeAccount = owner.stripe_account_id
    }
    else {
        stripeAccount = stripe_account_id
    }

    // now create a stripe connect onboarding link using the unique account id
    let accountLink = await stripe.accountLinks.create({
        account: stripeAccount,
        refresh_url: 'http://localhost:3000/user/owner-profile',
        return_url: 'http://localhost:3000/stripe/connect/callback',
        type: 'account_onboarding',
    });

    // the stripe connect link for onboarding
    let link = accountLink.url
    res.json({ link })
}

const setStripeConnectedStatus = async (req, res) => {

    // only gym owners can onboard to stripe
    if (req.user.role !== 'gym_owner') {
        return res.status(403).send("unauthorized")
    }

    // get gym owner
    let user = await userModel.findById(req.user.id)

    // get the gym owner's stripe account
    const stripeConnectAccount = await stripe.accounts.retrieve(user.stripe_account_id);

    // true or false depending on whether the gym owner complete the stripe connect onboarding form
    const payouts_enabled = stripeConnectAccount.payouts_enabled

    // if the gym owner completed the onboarding form, set payouts_enabled to true, else false
    user = await user.update({ payouts_enabled })

    res.status(201).json({ payouts_enabled })
}

const managePayoutSettings = async (req, res) => {

    let user = await userModel.findById(req.user.id)
    const loginLink = await stripe.accounts.createLoginLink(
        user.stripe_account_id, { redirect_url: 'http://localhost:3000/user/owner-profile' }
    );

    let link = loginLink.url
    res.json({ link })
}

const getBalances = async (req, res) => {
    let user = await userModel.findById(req.user.id)
    try {
        const balances = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id
        })
        res.json({ balances })
    } catch (error) {
        console.log(error)
    }
}


const createCheckoutSession = async (req, res) => {
    // TODO: temp: just gets ANY gym owner's stripe account id to forward payments to
    const gym_owner = await userModel.find({ role: "gym_owner" }).limit(1).exec();
    const stripe_account_id = gym_owner[0].stripe_account_id

    const product = 'gym'
    // const product = req.body.product

    let li = [{
        price_data: {
            currency: "eur",
            unit_amount: Math.ceil(req.body.baseItem.price * 100), // in eur cents no decimal points
            product_data: {
                //id: req.body.baseItem._id,
                name: req.body.baseItem.name + " (starts " + req.body.startDate + ")"
            },
        },
        quantity: 1,
    }];
    req.body.options.forEach(option => {
        li.push({
            price_data: {
                currency: "eur",
                unit_amount: Math.ceil(option.price * 100), // in eur cents no decimal points
                product_data: {
                    name: option.name,
                },
            },
            quantity: 1,
        })
    });

    try {
        let totalPrice = (req.body.baseItem.price + req.body.options.reduce((acc, curr) => acc + curr.price, 0)).toFixed(2)
        // create stripe checkout session for purchasing the product
        const sessionData = {
            payment_method_types: ["card"],

            line_items: li,

            mode: 'payment',
            success_url: `http://localhost:3000/stripe/checkout/callback/${product}/${req.body.id}`,
            cancel_url: `http://localhost:3000/buy/${req.body.id}/cancelled`,
            payment_intent_data: {
                application_fee_amount: Math.ceil(totalPrice * 0.25) * 100, // we get 25% cut and round up to nearest int in eur cent
                transfer_data: {
                    destination: stripe_account_id,
                },
            },
        };
        const session = await stripe.checkout.sessions.create(sessionData);
        session['pending_subscription'] = await subscriptionService.generateSubscriptionData(req.user.id, req.body.id, req.body.baseItem._id, req.body.startDate, req.body.baseItem.price, req.body.options)

        // save stripe payment session into user's model (with payment_status: unpaid)
        await userModel.findByIdAndUpdate(req.user.id, { stripe_session: session })

        res.json({ link: session.url })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Stripe error" })
    }
}


const getPaymentStatus = async (req, res) => {

    // the user who made this request
    const user = await userModel.findById(req.user.id)

    // user is not in a stripe checkout session
    if (!user.stripe_session || user.stripe_session == undefined || user.stripe_session == null) {
        return res.status(400).json({ message: "something went wrong" })
    }

    // get user's stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(user.stripe_session.id)
    // the session exists and belongs to the user
    if (session.payment_status === 'paid') {
        // handle successful legitament payment
        const subscription = new subscriptionModel({...user.stripe_session.pending_subscription}).save();
        if (subscription) {
            res.status(200)
            .json({ paid: true, message: `Subscription purchased`, response: subscription });
            await user.update({ stripe_session: null }) // delete checkout session so that it is not reused
        } else {
            res.status(404).json({ message: `Subscription not purchased` });
        }
        
    }

    else { // user is attempting to use stripe checkout callback before payment
        return res.json({ paid: false })
    }


}



module.exports = {
    createStripeConnectAccount,
    setStripeConnectedStatus,
    managePayoutSettings,
    getBalances,
    createCheckoutSession,
    getPaymentStatus
}