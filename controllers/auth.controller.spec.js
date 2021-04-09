

describe('AuthController', () => {

    const controller = require('./auth.controller');

    beforeEach(() => {
        
    })

    describe('#login()', () => {

        it('should validate input', () => {
            
            // Given a request without email/password
            const req = {
                body: {}
            };

            const resSpy = {
                send: jasmine.createSpy('send')
            };

            const next = jasmine.createSpy('next');

            // Then: execute controller
            controller.login(req, resSpy, next);

            // Expectations
            expect(next).toHaveBeenCalled();
            expect(resSpy.send).not.toHaveBeenCalled();
            const errorThrown = next.calls.mostRecent().args[0];
            expect(errorThrown).toBeDefined();
            expect(errorThrown.code).toEqual('BadRequest');
            expect(errorThrown.message).toEqual('Invalid request.');
        });
        
    });

});
