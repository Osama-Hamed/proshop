const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userService = require('../modules/shared/services/user');
const productService = require('../modules/shared/services/product');
const orderService = require('../modules/shared/services/order');
const users = require('./users');
const products = require('./products');

dotenv.config();

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

(async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('===== Connected to database successfuly =====');
  } catch (err) {
    console.error(err);
  }
})();

const importData = async () => {
  try {
    await orderService.deleteMany();
    await productService.deleteMany();
    await userService.deleteMany();

    const createdUsers = await userService.insertMany(users);
    const adminUser = createdUsers.find(user => user.isAdmin);
    const sampleProducts = products.map(product => ({
      ...product,
      user: adminUser._id,
    }));
    await productService.insertMany(sampleProducts);

    console.log('===== data imported successfully =====');
    process.exit();
  } catch (err) {
    console.log('===== error importing data =====', err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await orderService.deleteMany();
    await productService.deleteMany();
    await userService.deleteMany();

    console.log('===== data destroyed successfully =====');
    process.exit();
  } catch (err) {
    console.log('===== error destroying data =====', err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') destroyData();
else importData();
