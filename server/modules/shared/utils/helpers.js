const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 60 * 30 });

const encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

const getUser = (user, withToken = true) => {
  let _user = _.omit(user, ['password']);
  if (withToken) _.merge(_user, { token: generateToken(user._id) });
  return _user;
};

module.exports = { generateToken, encryptPassword, getUser };
