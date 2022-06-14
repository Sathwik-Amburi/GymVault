const mongoose = require("mongoose")

const SubscriptionSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    gymId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gym",
        required: true
    },
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: true,
    },
    price: {
        type: Number,
        required: true,
    },
    options: {
        type: [String],
    },
    purchaseDate:{
        type: Date,
        required: true,
    },
    expireDate:{
        type: Date,
        required: true
    },
    ticketSecret: {
        type: String,
        required: true
    }

});

const Subscription = mongoose.model("Subscription", SubscriptionSchema)

module.exports = Subscription