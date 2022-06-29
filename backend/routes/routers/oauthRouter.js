const router = require('express').Router()
const oauthController = require("../../controllers/oauthController");

router.post("/google", oauthController.googleAuth);

module.exports = router;

 