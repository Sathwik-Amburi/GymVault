const userModel = require("../database/models/user");
const stripe = require('stripe')(process.env.STRIPE_SK)

const createStripeConnectAccount = async (req, res) => {

    // only gym owners can onboard to stripe
    if (req.user.role !== 'gym_owner') {
        return res.status(403).send("unauthorized")
    }

    // stripe account id can be created once per gym owner
    let stripeAccount = null
    if (!req.user.stripe_account_id || req.user.stripe_account_id == null || req.user.stripe_account_id == undefined) {
        const account = await stripe.accounts.create({ type: 'express' });
        const owner = await userModel.findByIdAndUpdate(req.user.id, { stripe_account_id: account.id }, { new: true })
        stripeAccount = owner.stripe_account_id
    }
    else {
        stripeAccount = req.user.stripe_account_id
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
        res.json({balances})
    } catch (error) {
        console.log(error)
    }
}



module.exports = { createStripeConnectAccount, setStripeConnectedStatus, managePayoutSettings, getBalances }