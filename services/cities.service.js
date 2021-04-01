const mongoose = require('mongoose');
const { City } = require('../models');

class CitiesService {

    constructor(db) {
        this.db = db;
    }

    /**
     * Retrieves a list of all the [Cities].
     * @returns {Promise<Document[]>}
     */
    async getAllCities() {
        const cities = await City.find().exec();
        return cities;
    }

    /**
     * Retrieves a City by ID.
     * @param {string} id
     * @returns {Promise<Document>}
     */
    async getCity(id) {
        const doc = await City.findById(id).exec();
        return doc;
    }

    /**
     * Creates a new City Object.
     * @param {*} data
     * @returns {Promise<Document>}
     */
    async createCity(data) {
        const doc = new City(data);
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
     * Updates a City Object.
     * @param {string} id City ID
     * @param {*} data
     * @returns {Promise<Document>}
     */
    async updateCity(id, data) {
        const doc = await City.findById(id).exec();
        if( !doc ) {
            const error = new Error(`Invalid City ${id}.`);
            error.code = 404;
            throw error;
        }
        //const updateData = Object.assign(doc.toObject(), data);
        const city = await City.findOneAndUpdate({ _id: id }, data, {
            new: true
        }).exec();
        return city;
    }

    /**
     * Deletes a City Object.
     * @param {string} id City ID
     * @returns {Promise<Boolean>}
     */
    async deleteCity(id) {
        const doc = await City.findById(id).exec();
        if( !doc ) {
            const error = new Error(`Invalid City ${id}.`);
            error.code = 404;
            throw error;
        }
        await doc.deleteOne();
        return true;
    }

}

module.exports = CitiesService;
