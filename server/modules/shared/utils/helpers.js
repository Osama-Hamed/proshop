const jwt = require('jsonwebtoken');

const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 60 * 30 });

module.exports = { generateToken };
