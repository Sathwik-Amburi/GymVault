const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/reviewController");

router.get("/get-all-reviews", reviewController.getAllReviews);
router.get("/get/:id",reviewController.getReviewsById);
router.post("/add-review",reviewController.addReview);

module.exports = router;