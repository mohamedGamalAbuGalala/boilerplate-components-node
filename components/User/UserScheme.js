const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// hashing password before saving it
// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;
  const SALT_FACTOR = 10;

  // Checking if the user password has modified.
  if (!user.isModified('password')) next();

  try {
    const salt = bcrypt.genSaltSync(SALT_FACTOR);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
