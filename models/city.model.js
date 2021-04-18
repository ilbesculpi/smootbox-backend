const mongoose = require('mongoose');

const CITY_PLACEHOLDER = 'https://smootbox-dev-webcontent.s3.amazonaws.com/content/venues/placeholder.png';

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

Schema.pre('save', function(next) {
    if( !this.pictureUrl ) {
        this.pictureUrl = CITY_PLACEHOLDER;
    }
    next();
});

const Model = mongoose.model('City', Schema);

module.exports = {
    Model,
    Schema
};
