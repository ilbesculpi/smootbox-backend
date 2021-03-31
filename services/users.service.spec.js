
const UsersService = require('./users.service');

describe('UsersService', () => {

    it('can be created', () => {
        const service = new UsersService();
        expect(service).toBeDefined();
    });

});