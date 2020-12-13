const CustomError = require('./CustomError');

class BadRequestError extends CustomError {
  constructor(message) {
    super(400, message || 'Something went wrong');
  }
}

module.exports = BadRequestError;
