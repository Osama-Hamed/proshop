const BaseHandler = require('./BaseHandler');
const UserModel = require('../models').User;

class UserHandler extends BaseHandler {
  constructor() {
    super(UserModel);
  }
}

module.exports = new UserHandler();
