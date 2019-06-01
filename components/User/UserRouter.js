const express = require('express');
const authenticateMiddleware = require('../../middlewares/authenticateMiddleware');

const router = express.Router();

const controller = require('./UserController');
const {
  RegisterValidator,
  LoginValidator,
  updateStatusValidator
} = require('./validations');

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

// @route   POST api/user/change-status
// !access authenticated
router.post(
  '/change-status',
  [validate(updateStatusValidator), authenticateMiddleware],
  controller.updateStatus
);

module.exports = router;
