const express = require('express');

const router = express.Router();

const controller = require('./UserController');
const { RegisterValidator } = require('./validations');

const validate = require('../../middlewares/validateMiddleware');

// @route   POST api/user/register
// !access anonymous
router.post(
  '/register',
  // eslint-disable-next-line no-undef
  [uploadImages().single('avatar'), validate(RegisterValidator)],
  controller.register
);

module.exports = router;
