const CustomError = require('./CustomError.js');

class UsageError extends CustomError {
  constructor(messageKey, message, code) {
    super('UsageError', messageKey, message, code);
  }
}
module.exports = UsageError;
