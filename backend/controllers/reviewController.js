const reviewService = require("../services/reviewService");
const reviewModel = require("../database/models/review");

const getAllReviews = async (req, res) => {
  //this controller function uses the review service to fetch all the reviews from the database
  try {
    const reviews = await reviewService.getAllReviews();

    res.status(200).json(reviews);
  } catch (error) {
    console.log(`Error while fetching all reviews`, error.message);
    res.status(400).json({ error: "Error while fetching all reviews" });
  }
};

const getReviewsById = async (req, res) => {
  //this controller function uses the review service to fetch the reviews of course or a gym.
  const { id } = req.params;
  const gymReviews = await reviewService.getReviewsById(id);
  if (gymReviews) {
    res.status(200).json({ message: `Reviews found`, response: gymReviews });
  } else {
    res.status(404).json({ message: `Reviews not found` });
  }
};

const getReviewByUserId = async (req, res) => {
  //this controller function uses the review service to fetch the reviews/ratings of a user.
  const { userid, id } = req.params;
  const userReview = await reviewService.getReviewByUserId(userid, id);
  if (userReview) {
    res.status(200).json({ message: `Review found`, response: userReview });
  } else {
    res.status(404).json({ message: `Review not found` });
  }
};

const deleteReviewByUserId = async (req, res) => {
  //this controller function uses the review service to delete the reviews/ratings of a user.
  const { userid, id } = req.params;
  const userReview = await reviewService.deleteReviewByUserId(userid, id);
  if (userReview) {
    res.status(200).json({ message: `Review deleted`, response: userReview });
  } else {
    res.status(404).json({ message: `Review not deleted` });
  }
};

const addReview = async (req, res) => {
  //this controller function uses the review service to add a review by a user for a gym or a course
  try {
    const { userId, username, gymId, courseId, rating, title, description } =
      req.body;
    await reviewService.addReview(
      userId,
      username,
      gymId,
      courseId,
      rating,
      title,
      description
    );

    res
      .status(200)
      .json({ message: "Review added successfully", response: req.body });
  } catch (error) {
    console.log("Error while adding review", error.message);
  }
};

const getCourseOrGymRating = async (req, res) => {
  //this controller function uses the review service to fetch the review ratings a gym/course.
  try {
    const { id } = req.params;
    const rating = await reviewService.getCourseOrGymRating(id);

    res.status(200).json({ message: `rating found`, response: rating });
  } catch (error) {
    res.status(404).json({ message: `rating not found` });
  }
};

module.exports = {
  getAllReviews,
  getReviewsById,
  addReview,
  getCourseOrGymRating,
  getReviewByUserId,
  deleteReviewByUserId,
};
