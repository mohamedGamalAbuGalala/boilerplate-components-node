const CustomError = require('./CustomError.js');

class NotPermittedError extends CustomError {
  constructor(messageKey, message, code) {
    super('NotPermittedError', messageKey, message, code);
  }
}
module.exports = NotPermittedError;
