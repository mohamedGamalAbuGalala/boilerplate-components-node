const ExampleService = require('./services/ExampleService');

// @route   GET api/example/
exports.getAll = async (req, res, next) => {
  const result = await ExampleService.getAll(req.query.lastId);

  if (result.error) return next(result.error);

  return res.status(200).json({ result: result.data });
};

// @route   GET api/example/:id
exports.getOne = async (req, res, next) => {
  const id = req.params.id;

  const result = await ExampleService.getOne(id);

  if (result.error) return next(result.error);

  // return ok
  return res.status(200).json({ result: result.data });
};

// @route   POST api/example/
exports.add = async (req, res, next) => {
  const result = await ExampleService.addOne(req.body);

  if (result.error) return next(result.error);

  // return ok
  return res.status(201).json({ result: result.data });
};

// @route   PUT /api/example/:id
exports.edit = async (req, res, next) => {
  const id = req.params.id;

  const result = await ExampleService.updateOne(id, req.body);

  if (result.error) return next(result.error);

  // return ok
  return res.status(200).json({ result: result.data });
};

// @route   DELETE /api/example/test/:id
exports.delete = async (req, res, next) => {
  const id = req.params.id;

  const result = await ExampleService.deleteOne(id);

  if (result.error) return next(result.error);

  // return ok
  return res.status(200).json({ result: result.data });
};
