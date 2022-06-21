const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

// TODO: Add remaining endpoints
router.post("/login", authController.login);


module.exports = router;
