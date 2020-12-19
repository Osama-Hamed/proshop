const CustomError = require('./CustomError');

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(401, message || 'Unauthorized');
  }
}

module.exports = UnauthorizedError;
