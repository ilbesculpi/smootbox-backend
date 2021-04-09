const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: [true, `field is required.`]
    },
    description: String,
    pictureUrl: String,
    location: {
        lat: Number,
        lng: Number
    },
    website: String,
    address: String,
    enabled: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

Schema.query.byCity = function(city) {
    return this.where({ cityId: city });
};

const Model = mongoose.model('Venue', Schema);

module.exports = {
    Model,
    Schema
};
