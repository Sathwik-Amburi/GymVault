const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/reviewController");

router.get("/get-all-reviews", reviewController.getAllReviews);
router.get("/get/:id",reviewController.getReviewsById)

module.exports = router;