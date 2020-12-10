const BaseService = require('./BaseService');
const productHandler = require('../dbHandlers/product');

class ProductService extends BaseService {
  constructor() {
    super(productHandler);
  }
}

module.exports = new ProductService();
