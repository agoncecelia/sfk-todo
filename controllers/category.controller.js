const Category = require('../models/category.model');

module.exports = {
  create: (params, callback) => {
    Category.create(params, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, user);
    })
  },
  find: (params, callback) => {
    Category.find(params, (err, users) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, users);
    })
  },
  findById: (id, callback) => {
    Category.findById(id, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, user);
    });
  },
  update: (id, params, callback) => {
    Category.findOneAndUpdate({
      _id: id
    }, params, {
      new: true
    }, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, user);
    });
  },
  delete: (id, callback) => {
    Category.findOneAndDelete({
      _id: id
    }, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, user);
    })
  }
}
