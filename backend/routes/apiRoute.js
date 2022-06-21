const express = require("express");
const router = express.Router();
const gymRouter = require("./routers/gymRouter");
const courseRouter = require("./routers/courseRouter");
const authRouter = require("./routers/authRouter")

// TODO: Add remaining endpoints
router.use("/gyms", gymRouter);
router.use("/courses", courseRouter);
router.use("/users", authRouter)

module.exports = router;
