const restify = require('restify');
const dotenv = require('dotenv');
//const mongoose = require('mongoose');


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
// Routes
//

server.get('/', (req, res, next) => {
    res.send({
        message: 'Hello world!'
    });
    return next();
});


//
// Start Server
//
server.listen(PORT, () => {
    console.log('%s listening at %s', server.name, server.url);
});
