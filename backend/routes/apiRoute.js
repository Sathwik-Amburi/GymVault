const express = require("express");
const router = express.Router();
const gymRouter = require("./routers/gymRouter");
const courseRouter = require("./routers/courseRouter");

// TODO: Add remaining endpoints
router.use("/gyms", gymRouter);
router.use("/courses", courseRouter);

module.exports = router;
