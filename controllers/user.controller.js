const User = require('../models/user.model');
const JWT = require('jsonwebtoken');

module.exports = {
    create: (params, callback) => {
        User.create(params, (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, user);
        })
    },
    find: (params, callback) => {
        User.find(params, (err, users) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, users);
        })
    },
    findById: (id, callback) => {
        User.findById(id, (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, user);
        });
    },
    update: (id, params, callback) => {
        User.findOneAndUpdate({
            _id: id
        }, params, { new: true }, (err, user) => {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, user);
        });
    },
    delete: (id, callback) => {
        User.findOneAndDelete({
            _id: id
        }, (err, user) => {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, user);
        })
    },
    login: (email, password, callback) => {
        User.findOne({
            email: email
        }, (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (!user) {
                callback(null, null);
                return;
            }
            if (user != null) {
                user.comparePassword(password, (err, isMatch) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    if (isMatch) {
                        let token = JWT.sign(user.toJSON(), 'itcanbeanysecretkeyword', {expiresIn: '24h'})
                        callback(null, {
                            token: 'JWT ' + token,
                            user: {
                                id: user._id,
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName
                            }
                        })
                    } else {
                        callback('Wrong username or password.', null);
                    }
                })
            }
        })
    }

}