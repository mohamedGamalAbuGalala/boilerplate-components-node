const CustomError = require('./CustomError.js');

class UnconfirmedError extends CustomError {
  constructor(messageKey, message, code) {
    super('UnconfirmedError', messageKey, message, code);
  }
}
module.exports = UnconfirmedError;
