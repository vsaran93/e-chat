const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
  },
  expires: {
    type: Date,
  },
  revoked: {
    type: Date,
    default: null,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

refreshTokenSchema.virtual("isExpired").get(function () {
  return Date.now() >= this.expires;
});

refreshTokenSchema.virtual("isActive").get(function () {
  return !this.revoked && !this.isExpired;
});

refreshTokenSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id, delete ret.id, delete ret.userId;
  },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
