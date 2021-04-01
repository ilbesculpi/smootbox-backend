const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRY_SECONDS = process.env.JWT_EXPIRATION || 300;

class AuthService {

    constructor(db) {
        this.db = db;
    }

    /**
     * Authenticates a user using credentials.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<Document>}
     */
    async login(username, password) {
        const doc = await User.findOne({ email: username }).exec();
        if( !doc ) {
            const error = new Error(`User ${username} does not exist.`);
            error.code = 401;
            throw error;
        }
        if( !doc.enabled ) {
            const error = new Error('Disabled account.');
            error.code = 401;
            throw error;
        }
        if( !doc.authenticate(password) ) {
            const error = new Error('Invalid username or password.');
            error.code = 401;
            throw error;
        }
        return doc;
    }

    generateNewToken(user, expiry = JWT_EXPIRY_SECONDS) {
        const token = jwt.sign({
                uid: user._id,
                username: user.email
            }, JWT_SECRET, {
                algorithm: 'HS256',
                expiresIn: JWT_EXPIRY_SECONDS
            });
        return token;
    }

}

module.exports = AuthService;
