const router = require("express").Router()
const stripeController = require("../../controllers/stripeController");
const subscriptionController = require("../../controllers/subscriptionController");

router.post('/connect', stripeController.createStripeConnectAccount)
router.post('/set-stripeconnect-status', stripeController.setStripeConnectedStatus)
router.post('/edit-payout-settings', stripeController.managePayoutSettings)
router.get('/balances', stripeController.getBalances)

router.get(
    "/purchase/:courseOrGymId/:stripeToken",
    subscriptionController.checkOrPurchase
);

module.exports = router
 