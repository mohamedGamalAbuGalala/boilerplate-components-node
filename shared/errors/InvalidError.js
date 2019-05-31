const CustomError = require('./CustomError.js');

class InvalidError extends CustomError {
  constructor(messageKey, message, code) {
    super('InvalidError', messageKey, message, code);
  }
}
module.exports = InvalidError;
