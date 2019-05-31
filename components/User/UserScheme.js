const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    countryCode: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 5
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date
    },
    avatar: {
      type: String,
      required: true
    },
    email: String,
    password: String,
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    autoIndex: true
  }
);

module.exports = mongoose.model('User', userSchema);
