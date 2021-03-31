const { CitiesService } = require('../services');
const { handleError } = require('./controller');

const citiesService = new CitiesService();

/**
 * Handler GET /cities
 * Response : {City[]}
 */
module.exports.getAllCities = async (req, res, next) => {

    try {
        const cities = await citiesService.getAllCities();
        res.send(200, cities);
    }
    catch(error) {
        console.error('Error retrieving cities: ', error);
        res.send(error.code || 500, {
            message: `Could not retrieve cities`,
            error: error.message
        });
    }
    return next();
};

/**
 * Handles GET /cities/:id
 * :id city id
 * Response: {City}
 */
module.exports.getCity = async (req, res, next) => {

    const { id } = req.params;

    if( !id ) {
        const error = new Error(`Invalid City ID.`);
        error.code = 400;
        return next(handleError(error));
    }

    try {
        const city = await citiesService.getCity(id);
        if( !city ) {
            const error = new Error(`Invalid City ${id}.`);
            error.code = 404;
            return next(handleError(error));
        }
        res.send(200, city.toJSON());
    }
    catch(error) {
        console.error('Error retrieving city: ', error);
        next(handleError(error));
    }
    return next();
};

/**
 * Handles POST /cities
 * req.body: city data
 * Response : {City}
 */
module.exports.createCity = async (req, res, next) => {

    try {
        const data = req.body;
        const city = await citiesService.createCity(data);
        res.send(200, city);
        return next();
    }
    catch(error) {
        console.error('Error saving city: ', error);
        next(handleError(error));
    }
};

/**
 * Handles PUT /cities/:id
 * req.body: city data
 * Response : {City}
 */
module.exports.updateCity = async (req, res, next) => {

    const { id } = req.params;

    if( !id ) {
        const error = new Error(`Invalid City ID.`);
        error.code = 400;
        return next(handleError(error));
    }

    try {
        const data = req.body;
        const city = await citiesService.updateCity(id, data);
        res.send(200, city);
        next();
    }
    catch(error) {
        console.error('Error updating city: ', error);
        next(handleError(error));
    }
};

/**
 * Handles DELETE /cities/:id
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
module.exports.deleteCity = async (req, res, next) => {

    const { id } = req.params;

    if( !id ) {
        const error = new Error(`Invalid City ID.`);
        error.code = 400;
        return next(handleError(error));
    }

    try {
        const city = await recipesService.deleteCity(id);
        res.send(200, city);
        next();
    }
    catch(error) {
        console.error('Error deleting city: ', error);
        next(handleError(error));
    }
};
