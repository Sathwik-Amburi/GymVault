const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const subscriptionController = require("../../controllers/subscriptionController");

router.get("/profile", userController.getProfile);
router.get(
    "/subscriptions",
    subscriptionController.getSubscriptionsByUserId
);

module.exports = router;
