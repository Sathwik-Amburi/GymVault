const userModel = require("../database/models/user");
const stripe = require('stripe')('sk_test_51LG70WG5Luv4PP0963pHEyX1qVZnKWlIWYRGQIl8XVglZ6xrmDh2oKzO1u6RBBLblFgQm8aHbfyvL4O8MvqBNbOj00HeqcCLWq')

const createStripeConnectAccount = async (req, res) => {

    // only gym owners can onboard to stripe
    if (req.user.role !== 'gym_owner') {
        return res.status(403).send("unauthorized")
    }

    // stripe account id can be created once per gym owner
    let stripeAccount = null
    if (!req.user.stripe_account_id || req.user.stripe_account_id == null || req.user.stripe_account_id == undefined){
        const account = await stripe.accounts.create({ type: 'express' });
        const owner = await userModel.findByIdAndUpdate(req.user.id, { stripe_account_id: account.id }, { new: true })
        stripeAccount = owner.stripe_account_id
    }
    else{
        stripeAccount = req.user.stripe_account_id
    }

    // now create a stripe connect onboarding link using the unique account id
    let accountLink = await stripe.accountLinks.create({
        account: stripeAccount,
        refresh_url: 'http://localhost:3000/user/owner-profile',
        return_url: 'http://localhost:3000/gym/add',
        type: 'account_onboarding',
    });

    // the stripe connect link for onboarding
    let link = accountLink.url
    res.json({ link })
}

module.exports = { createStripeConnectAccount }