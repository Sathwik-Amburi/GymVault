const mongoose = require("mongoose");

// TODO: Add remaining fields, Add remaining Schemas
const GymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    default: 0,
  },
});

const Gym = mongoose.model("Gym", GymSchema);

module.exports = Gym;
