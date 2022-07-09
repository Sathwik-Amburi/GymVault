const reviewModel = require("../database/models/review");

class ReviewService {
  getAllReviews = async () => {
    try {
      const reviews = await reviewModel.find();
      return reviews;
    } catch (error) {
      console.log("Error while fetching all reivews in service", error.message);
    }
  };

  getReviewsById = async (Id) => {
    try {
      const gymReviews = await reviewModel.find({
        $or: [{ gymId: Id }, { courseId: Id }],
      });
      return gymReviews;
    } catch (error) {
      console.log("Error while fetching gym reviews", error.message);
    }
  };

  getReviewByUserId = async (userId,Id) =>{
    try {
      const reviewByUser = await reviewModel.findOne({
        $and: [
            {userId: userId},
            {$or:[{ gymId: Id }, {courseId: Id}]}
        ],
      });
      if (reviewByUser){
        return reviewByUser.rating
      }
      return reviewByUser;
    } catch (error) {
      console.log("Error while fetching user review", error.message);
    }
  };





  getCourseOrGymRating = async (id) => {
    try {
      const allRatings = await reviewModel
        .find({
          $or: [{ gymId: id }, { courseId: id }],
        })
        .select({ rating: 1, _id: 0 });

      if (allRatings.length > 0) {
        const rating =
          allRatings
            .map((item) => {
              return item.rating;
            })
            .reduce((prev, next) => {
              return prev + next;
            }) / allRatings.length;
        return rating;
      }
      return null;
    } catch (error) {
      console.log("Error while fetching rating", error.message);
    }
  };

  addReview = async (
    userId,
    username,
    gymId,
    courseId = null,
    rating,
    title,
    description
  ) => {
    const review = new reviewModel({
      userId,
      username,
      gymId,
      courseId,
      rating,
      title,
      description,
    });
    const newReview = await review.save();
  };
}

module.exports = new ReviewService();
