const mongoose = require("mongoose");

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
  options: {
    type: [String],
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
