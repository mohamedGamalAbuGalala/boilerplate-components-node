const { logger } = require('../startup/logging');

module.exports = (req, res, next) => {
  logger.info(`method: ${req.method}, url: ${req.url}`);
  return next();
};
