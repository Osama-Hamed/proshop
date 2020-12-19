const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const { UnauthorizedError } = require('../errors');

const authentication = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      const decoded = jwt.verify(
        authorization.split(' ')[1],
        process.env.JWT_SECRET,
      );
      req.user = await userService.findById(decoded.id);
      next();
    } catch (err) {
      throw new UnauthorizedError();
    }
  } else {
    throw new UnauthorizedError();
  }
};

module.exports = authentication;
