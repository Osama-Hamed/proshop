const { body, validationResult } = require('express-validator');
const { RequestValidationError } = require('../shared/errors');

const registrationRules = () => [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 6 and 20 characters'),
];

const registration = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
  next();
};

module.exports = { registrationRules, registration };
