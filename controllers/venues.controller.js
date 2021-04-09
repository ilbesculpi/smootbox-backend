const { VenuesService } = require('../services');
const { handleError } = require('./controller');
const mongoose = require('mongoose');

const db = mongoose.connection;
const venuesService = new VenuesService(db);


/**
 * Handler GET /cities/:cityId/venues
 * Response : {Venue[]}
 */
 module.exports.getCityVenues = async (req, res, next) => {

    const { cityId } = req.params;

    try {
        const venues = await venuesService.getCityVenues(cityId);
        res.send(200, venues);
    }
    catch(error) {
        console.error('Error retrieving city venues: ', error.message);
        console.error(error.stack);
        res.send(error.code || 500, {
            message: `Could not retrieve venues`,
            error: error.message
        });
    }
    return next();
};

/**
 * Handles POST /cities/:cityId/venues
 * req.body: venue data
 * Response : {Venue}
 */
 module.exports.createVenue = async (req, res, next) => {

    try {
        const { cityId } = req.params;
        const data = req.body;
        const venue = await venuesService.createVenue(cityId, data);
        res.send(200, venue);
        return next();
    }
    catch(error) {
        console.error('Error creating venue: ', error);
        next(handleError(error));
    }
};