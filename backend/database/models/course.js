const mongoose = require("mongoose");

// TODO: Add remaining fields, Add remaining Schemas
const CourseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,

    },

    gymId: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },
    description:  {
        type: String,
        required: true
    },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
