const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `field is required.`]
    },
    description: {
        type: String,
    },
    pictureUrl: {
        type: String,
    },
    enabled: {
        type: Boolean,
        default: true
    },
    venues: {
        type: [mongoose.Schema.Types.ObjectId]
    }
}, { timestamps: true });

const Model = mongoose.model('City', Schema);

module.exports = {
    Model,
    Schema
};
