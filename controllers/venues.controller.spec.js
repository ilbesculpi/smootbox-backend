

describe('VenuesController', () => {

    const controller = require('./venues.controller');

    beforeEach(() => {
        
    });

    describe('#getVenue()', () => {

        it('should return 404 for non-existing VenueID', () => {
            
            // Given a non existing VenueID
            const req = {
                params: { id: 'invalidID' },
                body: {}
            };

            const res = {
                send: jasmine.createSpy('send')
            };

            const next = jasmine.createSpy('next');

            // Then: execute controller
            controller.getVenue(req, res, next);

            // Expectations
            expect(next).toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
            const errorThrown = next.calls.mostRecent().args[0];
            expect(errorThrown).toBeDefined();
            expect(errorThrown.code).toEqual('NotFound');
            expect(errorThrown.message).toContain('Invalid venue.');
        });
        
    });

});
