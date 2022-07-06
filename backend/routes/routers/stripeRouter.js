const router = require("express").Router()
const stripeController = require("../../controllers/stripeController");
const subscriptionController = require("../../controllers/subscriptionController");

router.post('/connect', stripeController.createStripeConnectAccount)
router.get(
    "/purchase/:courseOrGymId/:stripeToken",
    subscriptionController.checkOrPurchase
);

module.exports = router
 