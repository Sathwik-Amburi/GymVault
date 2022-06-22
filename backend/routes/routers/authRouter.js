const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.registerUser);
router.get("/verifyEmail/:userId/:uniqueString", authController.verifyEmail);

module.exports = router;
