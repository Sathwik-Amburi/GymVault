const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/reviewController");

router.get("/get-all-reviews", reviewController.getAllReviews);
router.get("/get/:id", reviewController.getReviewsById);
router.post("/add-review", reviewController.addReview);
router.get("/rating/:id", reviewController.getCourseOrGymRating);

module.exports = router;
