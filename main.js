const restify = require('restify');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


//
// Server Config
//
dotenv.config();
const PORT = process.env.PORT || 8000;
const server = restify.createServer({});
server.use(restify.plugins.bodyParser({ mapParams: true }));


//
// CORS middleware
//
const corsMiddleware = require('restify-cors-middleware2');
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['Content-Type', 'Bearer'],
    exposeHeaders: ['Authorization']
});
server.pre(cors.preflight);
server.use(cors.actual);


// 
// Mongo Database middleware
// 
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

//
// Routes
//

server.get('/', (req, res, next) => {
    res.send({
        message: 'Hello world!'
    });
    return next();
});

// Auth Routes
const auth = require('./controllers/auth.controller');
server.post('/auth/login', auth.login);

// City Routes
const cities = require('./controllers/cities.controller');
server.get('/cities', cities.getAllCities);
server.get('/cities/:id', cities.getCity);
server.post('/cities', cities.createCity);
server.put('/cities/:id', cities.updateCity);
server.del('/cities/:id', cities.deleteCity);


//
// Start Server
//
server.listen(PORT, () => {
    console.log('%s listening at %s', server.name, server.url);
});
