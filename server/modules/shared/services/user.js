const BaseService = require('./BaseService');
const userHandler = require('../dbHandlers/user');

class UserService extends BaseService {
  constructor() {
    super(userHandler);
  }
}

module.exports = new UserService();
