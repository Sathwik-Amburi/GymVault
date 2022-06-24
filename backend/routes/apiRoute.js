const express = require("express");
const router = express.Router();
const gymRouter = require("./routers/gymRouter");
const courseRouter = require("./routers/courseRouter");
const authRouter = require("./routers/authRouter");

router.use("/gyms", gymRouter);
router.use("/courses", courseRouter);
router.use("/user", authRouter)
router.use("/authentication", authRouter);

module.exports = router;
