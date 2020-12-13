const productService = require('../shared/services/product');

const controller = {
  getProduct: async (_req, res) => {
    const products = await productService.find();
    res.status(200).json({ products });
  },

  getProductById: async (req, res) => {
    const product = await productService.findById(req.params.id);
    res.status(200).json({ product });
  },
};

module.exports = controller;
