const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      maxlength: 256,
    },
    fullName: {
      type: String,
      required: true,
      maxlength: 256,
    },
    email: {
      type: String,
      required: true,
      maxlength: 64,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
    },
    dob: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["admin", "participant"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 64,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
