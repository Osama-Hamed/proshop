const CustomError = require('./CustomError');

class RequestValidationError extends CustomError {
  constructor(errors) {
    super(422, 'request validation error');
    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.map(error => ({
      field: error.param,
      message: error.msg,
    }));
  }
}

module.exports = RequestValidationError;
