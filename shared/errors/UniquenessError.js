const CustomError = require('./CustomError.js');

class UniquenessError extends CustomError {
  constructor(messageKey, message, code) {
    super('UniquenessError', messageKey, message, code);
  }
}
module.exports = UniquenessError;
