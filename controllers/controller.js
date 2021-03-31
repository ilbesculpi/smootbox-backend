const errors = require('restify-errors');

module.exports.handleError = (error) => {

    if( !error.code ) {
        // return 500: Server Error
        const apiError = new errors.InternalServerError(error.message);
        return apiError;
    }

    if( error.code === 400 || error.code === 406 ) {
        const apiError = new errors.BadRequestError(error.message);
        return apiError;
    }

    if( error.code === 401 ) {
        const apiError = new errors.UnauthorizedError(error.message);
        return apiError;
    }

    if( error.code === 404 ) {
        const apiError = new errors.NotFoundError(error.message);
        return apiError;
    }

    // return 500: Unknown Error
    const apiError = new errors.InternalServerError(error.message);
    return apiError;
};

