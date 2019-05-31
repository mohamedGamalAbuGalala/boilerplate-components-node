const CustomError = require('./CustomError.js');

class ExpiryError extends CustomError {
  constructor(messageKey, message, code) {
    super('ExpiryError', messageKey, message, code);
  }
}
module.exports = ExpiryError;
