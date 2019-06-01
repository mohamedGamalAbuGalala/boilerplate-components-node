const jwt = require('jsonwebtoken');
const config = require('config');

const isAuthenticated = async (req, res, next) => {
  const token = req.body.auth_token || req.query.auth_token || req.headers.auth_token;
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.decoded = decoded;
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: { token: ['invalid'] } });
  }
};

module.exports = isAuthenticated;
