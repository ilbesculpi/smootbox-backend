
const VenuesService = require('./venues.service');

describe('VenuesService', () => {

    it('can be created', () => {
        const service = new VenuesService();
        expect(service).toBeDefined();
    });

});