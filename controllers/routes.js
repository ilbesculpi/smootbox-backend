const auth = require('./auth.controller');
const cities = require('./cities.controller');
const venues = require('./venues.controller');
const media = require('./media.controller');

module.exports = (server) => {

    // Home Dummy Route
    server.get('/', (req, res, next) => {
        res.send({
            message: 'Hello world!'
        });
        return next();
    });

    //#region Auth Routes
    server.post('/auth/login', auth.login);
    //#endregion

    //#region City Routes
    server.get('/cities', cities.getAllCities);
    server.get('/cities/:id', cities.getCity);
    server.post('/cities', cities.createCity);
    server.put('/cities/:id', cities.updateCity);
    server.del('/cities/:id', cities.deleteCity);
    server.put('/cities/:id/picture', media.uploadCityPicture);
    //#endregion

    //#region Venue Routes
    server.get('/cities/:cityId/venues', venues.getCityVenues);
    server.post('/cities/:cityId/venues', venues.createVenue);
    server.get('/venues/:id', venues.getVenue);
    server.put('/venues/:id', venues.updateVenue);
    server.del('/venues/:id', venues.deleteVenue);
    //#endregion

};
