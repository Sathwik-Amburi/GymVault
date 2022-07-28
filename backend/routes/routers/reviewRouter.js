const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/reviewController");

router.get("/get-all-reviews", reviewController.getAllReviews); //use this route to get all the reviews
router.get("/get/:id", reviewController.getReviewsById); // use this route to get reviews of a gym or a course
router.post("/add-review", reviewController.addReview); // use this route to let user add a review
router.get("/rating/:id", reviewController.getCourseOrGymRating); //use this route to get gym or course rating
router.get("/user/:userid-:id", reviewController.getReviewByUserId); // use this route to get the reviews/rating of a user

module.exports = router;
