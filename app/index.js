const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth.js');
const guest = require('./middlewares/guest.js');
const QuestionManager = require('./QuestionManager.js');

const server = express();
const qm = new QuestionManager('...');

server.use(bodyParser.json());


// express run (after mongoose connected)
function init() {
    console.log('mongoose is connected');
    server.listen(3000, () => {
        console.log('express is up!');
    });
}

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/questioner');
mongoose.connection
    .once('open', init)
    .on('error', console.error);