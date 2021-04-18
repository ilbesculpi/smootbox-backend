const { VenuesService } = require('../services');
const { handleError } = require('./controller');
const mongoose = require('mongoose');

const db = mongoose.connection;
const venuesService = new VenuesService(db);


/**
 * Handles GET /cities/:cityId/venues
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
 * Handles GET /venues/:id
 * Response : {Venue}
 */
module.exports.getVenue = async (req, res, next) => {

    const { id } = req.params;

    if( !id ) {
        const error = new Error(`Invalid Venue ID.`);
        error.code = 400;
        return next(handleError(error));
    }

    try {
        const venue = await venuesService.getVenue(id);
        if( !venue ) {
            const error = new Error(`Invalid Venue ${id}.`);
            error.code = 404;
            return next(handleError(error));
        }
        res.send(200, venue.toJSON());
    }
    catch(error) {
        console.error('Error retrieving venue: ', error);
        next(handleError(error));
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


/**
 * Handles PUT /venues/:id
 * req.body: venue data
 * Response : {Venue}
 */
 module.exports.updateVenue = async (req, res, next) => {

    const { id } = req.params;

    if( !id ) {
        const error = new Error(`Invalid Venue ID.`);
        error.code = 400;
        return next(handleError(error));
    }

    try {
        const data = req.body;
        const venue = await venuesService.updateVenue(id, data);
        res.send(200, venue);
        next();
    }
    catch(error) {
        console.error('Error updating venue: ', error);
        next(handleError(error));
    }
};


/**
 * Handles DELETE /venues/:id
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
module.exports.deleteVenue = async (req, res, next) => {

    const { id } = req.params;

    if( !id ) {
        const error = new Error(`Invalid Venue ID.`);
        error.code = 400;
        return next(handleError(error));
    }

    try {
        const result = await venuesService.deleteVenue(id);
        res.send(200, { result });
        next();
    }
    catch(error) {
        console.error('Error deleting venue: ', error);
        next(handleError(error));
    }
};