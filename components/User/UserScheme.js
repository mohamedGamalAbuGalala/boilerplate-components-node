const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 200,
      trim: true,
      unique: true,
      required: true
    },
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

module.exports = mongoose.model('User', User);
