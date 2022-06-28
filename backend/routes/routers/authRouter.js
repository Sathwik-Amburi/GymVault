const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

router.post("/login", authController.login);
router.post("/signup", authController.registerUser);
router.post("/signup-gym-owner", authController.registerGymOwner);
router.get("/verifyEmail/:userId/:uniqueString", authController.verifyEmail);

module.exports = router;
