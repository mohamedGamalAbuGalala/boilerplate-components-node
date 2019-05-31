const CustomError = require('./CustomError.js');

class NotFoundError extends CustomError {
  constructor(messageKey, message, code) {
    super('NotFoundError', messageKey, message, code);
  }
}
module.exports = NotFoundError;
