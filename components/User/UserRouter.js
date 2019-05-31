const express = require('express');

const router = express.Router();

const controller = require('./UserController');
const {
  CreateOneValidator,
  DeleteOneValidator,
  ReadOneValidator,
  UpdateOneValidator
} = require('./validations');

const validate = require('../../middlewares/validateMiddleware');

// @route   POST api/User/
// !access
router.post('/', validate(CreateOneValidator), controller.add);

// @route   PUT api/User/:id
// !access
router.delete('/:id', [validate(DeleteOneValidator)], controller.delete);

// @route   GET api/User/
// !access
router.get('/', [], controller.getAll);

// @route   PUT api/User/:id
// !access
router.put('/:id', [validate(UpdateOneValidator)], controller.edit);

// @route   GET api/User/:id
// !access
router.get('/:id', [validate(ReadOneValidator)], controller.getOne);

// @route   DELETE api/User/:id
// !access
router.delete('/:id', [validate(DeleteOneValidator)], controller.delete);

module.exports = router;
