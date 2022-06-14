const mongoose = require("mongoose");

// TODO: Add remaining fields, Add remaining Schemas
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
        default: "",
    },

    address: {
        type: String,
        required: true,
        default: "",
    },

    city: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: Number,
        default: 0,
    },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
