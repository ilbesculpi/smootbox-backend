const { handleError } = require('./controller');
const { AuthService } = require('../services');

const authService = new AuthService();

/**
 * Handler POST /auth/login
 * req.body: { username, password }
 * Response : {User|AuthError}
 */
module.exports.login = async (req, res, next) => {

    //res.setHeader('Access-Control-Allow-Origin', req.header('origin') || '*');
    //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //res.setHeader('Access-Control-Allow-Methods', 'POST');

    try {

        // Extract data from request
        const { email, password } = req.body;

        if( !email || !password ) {
            const error = new Error('Invalid request.');
            error.code = 400;
            error.name = 'ValidationError';
            throw error;
        }

        // Authenticate user
        const user = await authService.login(email, password);

        // Issue a new token
        const token = authService.generateNewToken(user);
        console.log('token', token);

        res.send(200, {
            access_token: token,
            user
        });

        return next();
    }
    catch(error) {
        console.error('Error login user: ', error.message);
        next(handleError(error));
    }
};
