const CustomError = require('./CustomError.js');

class DeleteRestrictionError extends CustomError {
  constructor(messageKey, message, code) {
    super('DeleteRestrictionError', messageKey, message, code);
  }
}
module.exports = DeleteRestrictionError;
