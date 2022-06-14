const mongoose = require("mongoose");

// TODO: Add remaining fields, Add remaining Schemas
const CourseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym", required: true
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
