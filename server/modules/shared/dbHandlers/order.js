const BaseHandler = require('./BaseHandler');
const OrderModel = require('../models').Order;

class OrderHandler extends BaseHandler {
  constructor() {
    super(OrderModel);
  }
}

module.exports = new OrderHandler();
