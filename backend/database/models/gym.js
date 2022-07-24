const mongoose = require("mongoose");

const subscriptionOffer = new mongoose.Schema({
  subscriptionType: {
    type: String,
    enum: ["DAY_PASS", "MONTHLY_PASS", "YEARLY_PASS"],
    required: true,
  },
  subscriptionPrice: {
    type: Number,
    required: true,
  },
  discount:{
    type: Number,
    default:0
  }
});

const Option = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const GymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    trim: true,
    default: "",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
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
  optionals: {
    type: [Option],
    default: [],
  },
  websiteURL: {
    type: String,
  },
  subscriptionOffers: {
    type: [subscriptionOffer],
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  coordinates: {
    type: [Number],
    default: [999, 999]
  }
});

const Gym = mongoose.model("Gym", GymSchema);

module.exports = Gym;
