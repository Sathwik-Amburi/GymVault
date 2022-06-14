const mongoose = require("mongoose");

// TODO: Add remaining fields, Add remaining Schemas
const GymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
});

const Gym = mongoose.model("Gym", GymSchema);

module.exports = Gym;
