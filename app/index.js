const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth.js');
const guest = require('./middlewares/guest.js');
const QuestionManager = require('./QuestionManager.js');

const server = express();
const qm = new QuestionManager('...');

server.use(bodyParser.json());


// for guests, the first point
server.post('/', guest, function (req, res) {
    QM.join(req, res);
});


// see your answers
server.post('/sheet', auth, function (req, res) {
    QM.sheet(req, res);
});

// reset the Q/A, then you can start with a new token
server.post('/reset', auth, function (req, res) {
    QM.reset(req, res);
});

// get the question
server.get('/:qid',function (req, res) {
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
mongoose.connect('mongodb://localhost/questioner', {
    useNewUrlParser: true
});
mongoose.connection
    .once('open', init)
    .on('error', console.error);