const productService = require('../shared/services/product');

const controller = {
  getProduct: async (_req, res) => {
    const products = await productService.find();
    res.send({ products });
  },
};

module.exports = controller;
