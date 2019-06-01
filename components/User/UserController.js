const UserAuthService = require('./services/UserAuthService');
const { permittedParams } = require('../../shared/bodyPicker');
const UserService = require('./services/UserService');

const registerBody = [
  'firstName',
  'lastName',
  'countryCode',
  'phoneNumber',
  'gender',
  'birthDate',
  'avatar',
  'email',
  'password'
];

// @route   POST api/user/register
exports.register = async (req, res, next) => {
  req.body.avatar = req.file.path;
  const safeBody = permittedParams(req.body, registerBody);
  const result = await UserAuthService.register(safeBody);

  if (result.error) return next(result.error);

  // return ok
  return res.status(201).json({ result: result.data });
};

const loginBody = ['phoneNumber', 'password'];
// @route   POST api/user/login
exports.login = async (req, res, next) => {
  const safeBody = permittedParams(req.body, loginBody);
  const result = await UserAuthService.login(safeBody);

  if (result.error) return next(result.error);

  // return ok
  return res.status(201).json({ result: result.data });
};

const updateStatusBody = ['phoneNumber', 'status'];
// @route   POST api/user/change-status
exports.updateStatus = async (req, res, next) => {
  const safeBody = permittedParams(req.body, updateStatusBody);
  const result = await UserService.updateStatus(safeBody, req.decoded);

  if (result.error) return next(result.error);

  // return ok
  return res.status(201).json({ result: result.data });
};
