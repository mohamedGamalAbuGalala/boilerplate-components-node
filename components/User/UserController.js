const UserService = require('./services/UserService');

// @route   POST api/user/register
exports.register = async (req, res, next) => {
  req.body.avatar = req.file.path;
  const result = await UserService.register(req.body);

  if (result.error) return next(result.error);

  // return ok
  return res.status(201).json({ result: result.data });
};
