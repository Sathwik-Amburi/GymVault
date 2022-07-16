const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const subscriptionController = require("../../controllers/subscriptionController");

router.get("/profile", userController.getProfile);
router.get(
    "/subscriptions",
    subscriptionController.getSubscriptionsByUserId
);

router.post("/s3/putItem", userController.retrievePutSignedURL)

module.exports = router;
