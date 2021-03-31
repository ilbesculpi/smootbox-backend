const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// database middleware
console.log('Connecting to database...');
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //user: process.env.DB_USER,
    //pass: process.env.DB_PASSWORD,
});
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('connection error:', error);
});
db.on('open', () => {
    console.log('Connected.');
});

exports.default = db;
