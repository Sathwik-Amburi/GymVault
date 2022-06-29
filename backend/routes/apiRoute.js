const express = require("express");
const router = express.Router();
const { validateJwtToken } = require("../middleware/jwtAuth");
const gymRouter = require("./routers/gymRouter");
const courseRouter = require("./routers/courseRouter");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const reviewRouter = require("./routers/reviewRouter")

router.use("/gyms", gymRouter);
router.use("/courses", courseRouter);
router.use("/user", validateJwtToken, userRouter);
router.use("/authentication", authRouter);
router.use("/reviews",reviewRouter);

module.exports = router;
