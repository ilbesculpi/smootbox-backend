
const CitiesService = require('./cities.service');

describe('CitiesService', () => {

    it('can be created', () => {
        const service = new CitiesService();
        expect(service).toBeDefined();
    });

});