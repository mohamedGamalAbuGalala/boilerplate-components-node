class CustomError extends Error {
  constructor(name, messageKey, message, code) {
    super(message);
    this.name = name || 'CustomError';
    this.code = code;
    this.userMessage = (messageKey) ? `error.${this.name}.${messageKey}` : `error.${this.name}`;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = CustomError;
