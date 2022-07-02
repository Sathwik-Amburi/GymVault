const router = require("express").Router()
const stripeController = require("../../controllers/stripeController");

router.post('/connect', stripeController.createStripeConnectAccount)

module.exports = router
 