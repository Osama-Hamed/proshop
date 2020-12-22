const { body, validationResult } = require('express-validator');
const userService = require('../shared/services/user');
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

const registration = async (req, _res, next) => {
  const errors = validationResult(req);
  const errorsArray = errors.array();
  const userExisted = await userService.findOne({ email: req.body.email });
  if (!errors.isEmpty() || userExisted) {
    if (userExisted && !errorsArray.find(err => err.field === 'email')) {
      errorsArray.push({ param: 'email', msg: 'Email already exists' });
    }
    throw new RequestValidationError(errorsArray);
  }
  next();
};

module.exports = { registrationRules, registration };
