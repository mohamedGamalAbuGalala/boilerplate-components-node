const UserService = require('./services/UserService');

// @route   GET api/user/
exports.getAll = async (req, res, next) => {
  const result = await UserService.getAll(req.query.lastId);

  if (result.error) return next(result.error);

  return res.status(200).json({ result: result.data });
};

// @route   GET api/user/:id
exports.getOne = async (req, res, next) => {
  const id = req.params.id;

  const result = await UserService.getOne(id);

  if (result.error) return next(result.error);

  // return ok
  return res.status(200).json({ result: result.data });
};

// @route   POST api/user/
exports.add = async (req, res, next) => {
  const result = await UserService.addOne(req.body);

  if (result.error) return next(result.error);

  // return ok
  return res.status(201).json({ result: result.data });
};

// @route   PUT /api/user/:id
exports.edit = async (req, res, next) => {
  const id = req.params.id;

  const result = await UserService.updateOne(id, req.body);

  if (result.error) return next(result.error);

  // return ok
  return res.status(200).json({ result: result.data });
};

// @route   DELETE /api/user/test/:id
exports.delete = async (req, res, next) => {
  const id = req.params.id;

  const result = await UserService.deleteOne(id);

  if (result.error) return next(result.error);

  // return ok
  return res.status(200).json({ result: result.data });
};
