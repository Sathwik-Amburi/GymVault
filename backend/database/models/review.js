const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    gymId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gym",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    rating: {
        type: Number,
        // validation for the rating
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

});

const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review