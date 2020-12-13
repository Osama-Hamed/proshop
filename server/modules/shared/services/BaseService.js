class BaseService {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }

  find(conditions) {
    if (!conditions) {
      conditions = {};
    }
    return this.dbHandler.find(conditions);
  }

  findById(id) {
    return this.dbHandler.findById(id);
  }

  findOne(query) {
    return this.dbHandler.findOne(query);
  }

  create(values) {
    return this.dbHandler.create(values);
  }

  insertMany(values) {
    return this.dbHandler.insertMany(values);
  }

  update(conditions, keyValMap, options = {}) {
    return this.dbHandler.updateMany(conditions, keyValMap, options);
  }

  updateById(id, keyValMap) {
    return this.dbHandler.findByIdAndUpdate(id, keyValMap, { new: true });
  }

  updateOne(conditions, update) {
    this.dbHandler.updateOne(conditions, update);
  }

  deleteOne(conditions) {
    return this.dbHandler.deleteOne(conditions);
  }

  deleteMany(conditions) {
    return this.dbHandler.deleteMany(conditions);
  }

  count(conditions) {
    return this.dbHandler.count(conditions);
  }
}

module.exports = BaseService;
