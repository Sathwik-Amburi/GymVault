const mongoose = require("mongoose");

// TODO: Add remaining fields, Add remaining Schemas
const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin", "gym_owner"],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    trim: true,
  },
  // username: {
  //     type: String,
  //     unique: 'testing error message',
  //     required: 'Please fill in a username',
  //     trim: true
  // },
  email: {
    type: String,
    trim: true,
    // need to add validation for email
    // validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    // need validation for password
    // validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
  /* For reset password */
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  subscriptions: {
    type: [Number],
    //    Number should be replaced with the subscription schema
  },
  stripe_account_id: {
    type: String,
  },
  payouts_enabled:{
    type: Boolean,
    default: false
  },
  stripe_session: {
    type: Object,
    required: false,
    default: null
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
