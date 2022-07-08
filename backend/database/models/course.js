const mongoose = require("mongoose");

const subscriptionOffer = new mongoose.Schema({
  subscriptionType: {
    type: String,
    enum: ["SESSION_PASS", "MONTHLY_PASS", "YEARLY_PASS"],
    required: true,
  },
  subscriptionPrice: {
    type: Number,
    required: true,
  },
});

const CourseSchema = new mongoose.Schema({
  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  subscriptionOffers: {
    type: [subscriptionOffer],
    required: true,
  },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
