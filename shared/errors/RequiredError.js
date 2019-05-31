const CustomError = require('./CustomError.js');

class RequiredError extends CustomError {
  constructor(messageKey, message, code) {
    super('RequiredError', messageKey, message, code);
  }
}
module.exports = RequiredError;
