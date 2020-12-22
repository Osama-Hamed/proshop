const bcrypt = require('bcryptjs');
const _ = require('lodash');
const userService = require('../shared/services/user');
const {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} = require('../shared/errors');
const { generateToken } = require('../shared/utils/helpers');

const controller = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user = await userService.create({
      name,
      email,
      password: encryptedPassword,
    });
    res.status(201).json({
      user: _.merge(_.omit(user.toObject(), ['password']), {
        token: generateToken(user._id),
      }),
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.findOne({ email });
    const matchPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!user || !matchPassword)
      throw new UnauthorizedError('Invalid Email or Password');
    res.status(200).json({
      user: _.merge(_.omit(user.toObject(), ['password']), {
        token: generateToken(user._id),
      }),
    });
  },

  getUserProfile: async (req, res) => {
    const user = await userService.findById(req.user._id);
    if (!user) throw new NotFoundError('User not found');
    res.status(200).json({
      user: _.omit(user.toObject(), ['password']),
    });
  },
};

module.exports = controller;
