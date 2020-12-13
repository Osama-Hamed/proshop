class BaseHandler {
  constructor(model) {
    this.model = model;
  }

  find(conditions) {
    if (!conditions) {
      conditions = {};
    }
    return this.model.find(conditions);
  }

  findById(id) {
    return this.model.findById(id);
  }

  findOne(query) {
    return this.model.findOne(query);
  }

  create(values) {
    return this.model.create(values);
  }

  insertMany(values) {
    return this.model.insertMany(values);
  }

  update(conditions, keyValMap, options = {}) {
    return this.model.updateMany(conditions, { $set: keyValMap }, options);
  }

  updateMany(conditions, keyValMap, options = {}) {
    return this.model.updateMany(conditions, { $set: keyValMap }, options);
  }

  updateById(id, keyValMap) {
    return this.model.findByIdAndUpdate(id, { $set: keyValMap }, { new: true });
  }

  findByIdAndUpdate(id, keyValMap) {
    return this.model.findByIdAndUpdate(id, { $set: keyValMap }, { new: true });
  }

  updateOne(conditions, update) {
    this.model.updateOne(conditions, update);
  }

  deleteOne(conditions) {
    return this.model.deleteOne(conditions);
  }

  deleteMany(conditions) {
    return this.model.deleteMany(conditions);
  }

  count(conditions) {
    return this.model.count(conditions);
  }
}

module.exports = BaseHandler;
