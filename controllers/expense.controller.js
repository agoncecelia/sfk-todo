const User = require('../models/user.model');

module.exports = {
  create: (user_id, params, callback) => {
    User.findByIdAndUpdate(user_id, {
      $push: {
        expenses: params
      }
    }, {
      new: true
    }, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, user);
    })
  },
  find: (user_id, callback) => {
    User.findById(user_id, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, user);
    })
  },
  update: (user_id, expense_id, body, callback) => {
    User.findOneAndUpdate({
        '_id': user_id,
        'expenses._id': expense_id
      }, {
        $set: {
          'expenses.$.amount': body.amount,
          'expenses.$.category': body.category,
          'expenses.$.type': body.type
        }
      }, {
        new: true
      },
      (err, user) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, user)
      });
  },
  delete: (user_id, expense_id, callback) => {
    User.findByIdAndUpdate(user_id, {
      $pull: {
        expenses: {
          '_id': expense_id
        }
      }
    }, {
      new: true
    }, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, user)
    })
  }
}