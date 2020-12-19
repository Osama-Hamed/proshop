const express = require('express');
const productModule = require('../modules/product');
const userModule = require('../modules/user');

const router = app => {
  app.use('/api/product', productModule.routes.mount(createRouter()));
  app.use('/api/user', userModule.routes.mount(createRouter()));
};

const createRouter = () => express.Router();

module.exports = { router };
