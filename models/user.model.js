const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schemaOptions = {
    timestamps: true
};

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, schemaOptions);

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    todos: [todoSchema]
}, schemaOptions);


userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    })
})

// Remove password field when returning user documents from database.
userSchema.options.toJSON = {
    transform: (doc, ret, options) => {
        delete ret.password;
    }
}

userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        callback(err, isMatch);
    })
}

module.exports = mongoose.model('User', userSchema);