const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 10,
      required: true,
    },
    firstName: {
      type: String,
      maxlength: 128,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      maxlength: 128,
      required: true,
      trim: true
    },
    picture: {
      type: String,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('User', userSchema);