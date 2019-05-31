const CustomError = require('./CustomError.js');

class NotAcceptedError extends CustomError {
  constructor(messageKey, message, code) {
    super('NotAcceptedError', messageKey, message, code);
  }
}
module.exports = NotAcceptedError;
