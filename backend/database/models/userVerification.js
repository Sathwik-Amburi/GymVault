const mongoose = require("mongoose");

const UserVerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  uniqueString: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  expiresOn: {
    type: Date,
  },
});

const UserVerification = mongoose.model(
  "UserVerificationSchema",
  UserVerificationSchema
);

module.exports = UserVerification;
