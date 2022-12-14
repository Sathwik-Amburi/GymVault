const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    ref: "User",
    required: true,
  },
  gymId: {
    type: String,
    ref: "Gym",
    default: null,
    // required: true,
  },
  courseId: {
    type: String,
    ref: "Course",
    default: null,
  },
  rating: {
    type: Number,
    // validation for the rating
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
