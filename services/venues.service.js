const mongoose = require('mongoose');
const { Venue, City } = require('../models');

class VenuesService {

    /**
     * Creates a new VenuesService
     * @param {mongoose.Connection} db 
     */
    constructor(db) {
        this.db = db;
    }

    /**
     * Retrieves a list of all the [Venues] belonging to a [City].
     * @returns {Promise<Venue[]>}
     */
    async getCityVenues(cityId) {
        const venues = await Venue.find().exec();
        return venues;
    }

    /**
     * Retrieves a Venue by ID.
     * @param {string} id
     * @returns {Promise<Venue>}
     */
    async getVenue(id) {
        const doc = await Venue.findById(id).exec();
        return doc;
    }

    /**
     * Creates a new Venue Object.
     * @param {ObjectId} cityId
     * @param {*} data
     * @returns {Promise<Venue>}
     */
    async createVenue(cityId, data) {

        // Insert the new Venue
        const doc = await Venue.create({ ...data, cityId: cityId });
        const venueId = doc._id;
        // Retrieve the City
        const city = await City.findById(cityId).exec();
        // Update city's venues
        city.venues.push(venueId);
        await city.save();

        //const doc = await Venue.findById(venueId).exec();
        return doc;
    }

}

module.exports = VenuesService;
