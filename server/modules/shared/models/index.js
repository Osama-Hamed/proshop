const mongoose = require('mongoose');
const { schemaNames } = require('./Schemas/utils/schemaNames');

const userSchemas = require('./Schemas/user');
const productSchemas = require('./Schemas/product');
const orderSchemas = require('./Schemas/order');

const User = mongoose.model(schemaNames.user, userSchemas.userSchema);
const Product = mongoose.model(
  schemaNames.product,
  productSchemas.productSchema,
);
const Order = mongoose.model(schemaNames.order, orderSchemas.orderSchema);

module.exports = { User, Product, Order };
