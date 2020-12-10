const BaseHandler = require('./BaseHandler');
const ProductModel = require('../models').Product;

class ProductHandler extends BaseHandler {
  constructor() {
    super(ProductModel);
  }
}

module.exports = new ProductHandler();
