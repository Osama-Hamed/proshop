const BaseService = require('./BaseService');
const orderHandler = require('../dbHandlers/order');

class OrderService extends BaseService {
  constructor() {
    super(orderHandler);
  }
}

module.exports = new OrderService();
