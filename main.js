const restify = require('restify');

const hello = (req, res, next) => {
    res.send('hello world!');
    next();
};

const server = restify.createServer();
server.get('/hello', hello);

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
