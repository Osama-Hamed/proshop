const CustomError = require('../errors/CustomError');

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};

module.exports = errorHandler;
