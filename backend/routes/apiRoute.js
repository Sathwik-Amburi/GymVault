const express = require("express");
const router = express.Router();
const { validateJwtToken } = require("../middleware/jwtAuth");
const gymRouter = require("./routers/gymRouter");
const courseRouter = require("./routers/courseRouter");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const reviewRouter = require("./routers/reviewRouter");
const oauthRouter = require("./routers/oauthRouter");
const stripeRouter = require("./routers/stripeRouter");
const subscriptionRouter = require("./routers/subscriptionRouter");

router.use("/gyms", gymRouter);
router.use("/courses", courseRouter);
router.use("/user", validateJwtToken, userRouter);
router.use("/authentication", authRouter);
router.use("/reviews", reviewRouter);
router.use("/oauth", oauthRouter);
router.use("/stripe", validateJwtToken, stripeRouter);
router.use("/subscriptions", subscriptionRouter);

module.exports = router;
