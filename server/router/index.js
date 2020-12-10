const express = require('express');
const productModule = require('../modules/product');

const router = app => {
  app.use('/api/product', productModule.routes.mount(createRouter()));
};

const createRouter = () => express.Router();

module.exports = { router };
