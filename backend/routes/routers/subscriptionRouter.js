const express = require("express");
const router = express.Router();
const subscriptionController = require("../../controllers/subscriptionController");
const { validateJwtToken } = require("../../middleware/jwtAuth");

router.get("/count-active-subscriptions", validateJwtToken, subscriptionController.countActiveSubscriptions);

module.exports = router;
