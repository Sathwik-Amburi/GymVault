const express = require("express");
const router = express.Router();
const gymRouter = require("./routers/gymRouter");

// TODO: Add remaining endpoints
router.use("/gyms", gymRouter);

module.exports = router;
