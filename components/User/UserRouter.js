const express = require('express');

const router = express.Router();

const controller = require('./UserController');
const { RegisterValidator, LoginValidator } = require('./validations');

const validate = require('../../middlewares/validateMiddleware');

// @route   POST api/user/register
// !access anonymous
router.post(
  '/register',
  // eslint-disable-next-line no-undef
  [uploadImages().single('avatar'), validate(RegisterValidator)],
  controller.register
);

// @route   POST api/user/login
// !access anonymous
router.post('/login', validate(LoginValidator), controller.login);

module.exports = router;
