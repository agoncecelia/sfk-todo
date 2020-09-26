const User = require('../models/user.model');

module.exports = {
    create: (user_id, params, callback) => {
        User.findByIdAndUpdate(user_id, {
            $push: {
                todos: params
            }
        }, { new: true}, (err, user) => {
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
    update: (user_id, todo_id, description, callback) => {
        User.findOneAndUpdate({
            '_id': user_id,
            'todos._id': todo_id
        },
        {
            $set: {
               'todos.$.description': description
            }
        },
        { new: true },
        (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, user)
        });
    },
    delete: (user_id, todo_id, callback) => {
        User.findByIdAndUpdate(user_id, {
            $pull: {
                todos: {
                    '_id': todo_id
                }
            }
        }, { new: true }, (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, user)
        })
    },
    markAsDone: (user_id, todo_id, callback) => {
        User.findOneAndUpdate({
            '_id': user_id,
            'todos._id': todo_id
        },
        {
            $set: {
               'todos.$.done': true
            }
        },
        { new: true },
        (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, user)
        });
    },

}