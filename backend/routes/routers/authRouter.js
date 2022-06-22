const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

// TODO: Add remaining endpoints
router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/verify", authController.verify);


module.exports = router;
