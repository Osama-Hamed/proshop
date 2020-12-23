const bcrypt = require('bcryptjs');
const userService = require('../shared/services/user');
const { UnauthorizedError, NotFoundError } = require('../shared/errors');
const { encryptPassword, getUser } = require('../shared/utils/helpers');

const controller = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    const encryptedPassword = await encryptPassword(password);
    const user = await userService.create({
      name,
      email,
      password: encryptedPassword,
    });
    res.status(201).json({ user: getUser(user.toObject()) });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.findOne({ email });
    const matchPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!user || !matchPassword)
      throw new UnauthorizedError('Invalid Email or Password');
    res.status(200).json({ user: getUser(user.toObject()) });
  },

  getUserProfile: async (req, res) => {
    const user = await userService.findById(req.user._id);
    if (!user) throw new NotFoundError('User not found');
    res.status(200).json({ user: getUser(user.toObject(), false) });
  },

  updateUserProfile: async (req, res) => {
    const user = await userService.findById(req.user._id);
    if (!user) throw new NotFoundError('User not found');
    const { name, email, password } = req.body;
    const updateData = { name: name || user.name, email: email || user.email };
    if (password) updateData.password = await encryptPassword(password);
    const updatedUser = await userService.updateById(user._id, updateData);
    res.status(200).json({ user: getUser(updatedUser.toObject()) });
  },
};

module.exports = controller;
