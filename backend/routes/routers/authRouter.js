const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

// TODO: Add remaining endpoints
router.post("/signin", authController.login);
router.post("/signup", authController.registerUser);
router.get("/verifyEmail/:userId/:uniqueString", authController.verifyEmail);

module.exports = router;
