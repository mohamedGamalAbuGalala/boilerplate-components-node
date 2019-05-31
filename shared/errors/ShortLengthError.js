const CustomError = require('./CustomError.js');

class ShortLengthError extends CustomError {
  constructor(messageKey, message, code) {
    super('ShortLengthError', messageKey, message, code);
  }
}
module.exports = ShortLengthError;
