class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = CustomError;
