const mongoose = require('mongoose');
const { User } = require('../models').Models;

class UsersService {

    constructor(db) {
        this.db = db;
    }

    async getAllUsers() {
        const users = await User.find().exec();
        return users;
    }

    /**
     * Retrieves a User record by ID.
     * @param {string} id
     * @returns {Promise<Document>}
     */
    async getUser(id) {
        const doc = await User.findById(id).exec();
        return doc;
    }

    /**
     * Creates a new User account.
     * @param {*} data
     * @returns {Promise<Document>}
     */
    async createUser(data) {
        const doc = new User(data);
        try {
            await doc.save();
            return doc;
        }
        catch(dbError) {

            // validation errors?
            if( dbError instanceof mongoose.Error.ValidationError ) {
                const error = new Error('Validation failed.');
                error.code = 406;
                error.name = 'ValidationError';
                error.message = dbError.message;
                throw error;
            }

            // wrap error
            const error = new Error('Unknown Error');
            error.code = 500;
            error.name = 'UnknownError';
            error.message = dbError.message;
            throw error;
        }
    }

    /**
     * Updates a User record on database.
     * @param {string} id User ID
     * @param {*} data
     * @returns {Promise<Document>}
     */
    async updateUser(id, data) {
        const doc = await User.findById(id).exec();
        if( !doc ) {
            const error = new Error(`Invalid User ID: ${id}.`);
            error.code = 404;
            throw error;
        }
        //const updateData = Object.assign(doc.toObject(), data);
        const recipe = await User.findOneAndUpdate({ _id: id }, data, {
            new: true
        }).exec();
        return recipe;
    }

    /**
     * Deletes a User record.
     * @param {string} id
     * @returns {Promise<void>}
     */
    async deleteUser(id) {
        const doc = await User.findById(id).exec();
        if( !doc ) {
            const error = new Error(`Invalid User ID: ${id}.`);
            error.code = 404;
            throw error;
        }
        await doc.deleteOne();
    }

}

module.exports = UsersService;
