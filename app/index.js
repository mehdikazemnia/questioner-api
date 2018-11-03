const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/db.json');
const auth = require('./middlewares/auth.js');
const basicAuth = require('./middlewares/basic-auth.js');
const guest = require('./middlewares/guest.js');
const QuestionManager = require('./QuestionManager.js');

const server = express();
const QM = new QuestionManager('name');

server.use(bodyParser.json());


// for guests, the first point
server.post('/', guest, function (req, res) {
    QM.join(req, res);
});


// see your answers
server.post('/sheet', basicAuth, function (req, res) {
    QM.sheet(req, res);
});

// reset the Q/A, then you can start with a new token
server.post('/reset', basicAuth, function (req, res) {
    QM.reset(req, res);
});

// get the question
server.get('/:qid', function (req, res) {
    QM.render(req, res);
});

// answer the question
server.post('/:qid', auth, function (req, res) {
    QM.respond(req, res);
});







// express run (after mongoose connected)
function init() {
    console.log('mongoose is connected');
    server.listen(3000, () => {
        console.log('express is up!');
    });
}

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.url, {
    useNewUrlParser: true
});
mongoose.connection
    .once('open', init)
    .on('error', console.error);