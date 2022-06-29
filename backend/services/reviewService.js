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
            // const gymReviews = await reviewModel.find({"gymId":Id });
            const gymReviews = await reviewModel.find({$or:[{"gymId":Id},{"courseId":Id}]});
            return gymReviews;

        } catch (error){
            console.log("Error while fetching gym reviews", error.message);
        }

    };
}

module.exports = new ReviewService();
