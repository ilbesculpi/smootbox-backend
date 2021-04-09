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
    description: {
        type: String,
    },
    pictureUrl: {
        type: String,
    },
    location: {
        lat: Number,
        lng: Number
    },
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
