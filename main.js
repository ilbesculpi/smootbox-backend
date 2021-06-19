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
const routes = require('./controllers/routes');
routes(server);



//
// Start Server
//
server.listen(PORT, () => {
    console.log('%s listening at %s', server.name, server.url);
});
