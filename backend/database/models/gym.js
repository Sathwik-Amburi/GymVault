const mongoose = require("mongoose");

// TODO: Add remaining fields, Add remaining Schemas
const GymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    default: '',
    // need to add validation for email
    // validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
    default: [],
  },
  websiteURL: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
});

const Gym = mongoose.model("Gym", GymSchema);

module.exports = Gym;
