const reviewService = require("../services/reviewService");
const reviewModel = require("../database/models/review")

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();

        res.status(200).json(reviews);
    } catch (error) {
        console.log(`Error while fetching all reviews`, error.message);
        res.status(400).json({ error: "Error while fetching all reviews" });
    }
};

const getReviewsById = async (req,res) => {
    const{ id } = req.params;
    const gymReviews = await reviewService.getReviewsById(id);
    if (gymReviews) {
        res.status(200).json({message: `Reviews found`, response: gymReviews});
    } else {
        res.status(404).json({ message: `Reviews not found` });
    }
};

const addReview = async (req,res) => {
    try {
        const {userId,username,gymId,courseId,rating,title,description} = req.body;
        await reviewService.addReview(
            userId,
            username,
            gymId,
            courseId,
            rating,
            title,
            description
        );

        res.status(200).json({message: "Review added successfully",response:req.body});
    } catch(error){
        console.log("Error while adding review",error.message);
    }
};

module.exports = { getAllReviews, getReviewsById,addReview };
