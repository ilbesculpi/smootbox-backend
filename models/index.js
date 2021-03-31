const User = require('./user.model');

module.exports = {
    Models: {
        User: User.User,
    },
    Schema: {
        User: User.Schema,
    }
};
