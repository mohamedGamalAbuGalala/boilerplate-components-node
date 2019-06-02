const CustomError = require('./CustomError.js');

class UnmatchedError extends CustomError {
  constructor(messageKey, message, code) {
    super('UnmatchedError', messageKey, message, code);
  }
}
module.exports = UnmatchedError;
