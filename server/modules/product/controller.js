const productService = require('../shared/services/product');

const controller = {
  getProduct: async (_req, res) => {
    const products = await productService.find();
    res.status(200).json({ products });
  },
};

module.exports = controller;
