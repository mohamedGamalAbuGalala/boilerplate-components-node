const express = require('express');

const router = express.Router();

const controller = require('./ExampleController');
const {
  CreateOneValidator,
  DeleteOneValidator,
  ReadOneValidator,
  UpdateOneValidator
} = require('./validations');

const validate = require('../../middlewares/validateMiddleware');

// @route   POST api/Example/
// !access
router.post('/', validate(CreateOneValidator), controller.add);

// @route   PUT api/Example/:id
// !access
router.delete('/:id', [validate(DeleteOneValidator)], controller.delete);

// @route   GET api/Example/
// !access
router.get('/', [], controller.getAll);

// @route   PUT api/Example/:id
// !access
router.put('/:id', [validate(UpdateOneValidator)], controller.edit);

// @route   GET api/Example/:id
// !access
router.get('/:id', [validate(ReadOneValidator)], controller.getOne);

// @route   DELETE api/Example/:id
// !access
router.delete('/:id', [validate(DeleteOneValidator)], controller.delete);

module.exports = router;
