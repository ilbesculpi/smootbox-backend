const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `field is required.`]
    },
    email: {
        type: String,
        required: [true, `field is required.`],
        lowercase: true,
        trim: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, `field is required.`]
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'app'],
        default: 'user'
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

/**
 * Middleware for hashing the password before saving.
 */
Schema.pre('save', function(next) {
    if( !this.isModified('password') ) {
        return next();
    }
    bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
        this.password = hash;
        next();
    });
});

Schema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', Schema);

module.exports = {
    User,
    Schema
};
