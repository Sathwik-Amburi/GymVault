const mongoose = require("mongoose");

// TODO: make option.js, deduplicate
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

const SubscriptionSchema = new mongoose.Schema({
  userId: {
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
    ref: "Course"
  },
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ["DAY_PASS", "MONTHLY_PASS", "YEARLY_PASS"],
  },
  price: {
    type: Number,
    required: true,
  },
  optionals: {
    type: [Option],
  },
  purchaseDate: {
    type: Date,
    required: false,
  },
  expireDate: {
    type: Date,
    required: false,
  },
  ticketSecret: {
    type: String,
    required: false,
  },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
