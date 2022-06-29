const reviewService = require("../services/reviewService");

const getAllReviews = async (req, res) => {
    try {
        const gyms = await reviewService.getAllReviews();

        res.status(200).json(gyms);
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
module.exports = { getAllReviews, getReviewsById };
