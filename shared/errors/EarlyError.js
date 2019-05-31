const CustomError = require('./CustomError.js');

class EarlyError extends CustomError {
  constructor(messageKey, message, code) {
    super('EarlyError', messageKey, message, code);
  }
}
module.exports = EarlyError;
