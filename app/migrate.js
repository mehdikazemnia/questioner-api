const mongoose = require('mongoose');
const questions = require('./storage/questions.json');
const Question = require('./models/Question.js');
const config = require('./config/db.json');

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.url, {
    useNewUrlParser: true
});
mongoose.connection
    .once('open', function () {
        Question.deleteMany({}).exec().then(() => {
            init();
        });
    })
    .on('error', console.error);


function init() {
    function inject(n) {
        let question = new Question(questions[n]);
        question.save().then(() => {
            n++;
            if (n == questions.length) {
                console.log(n + " questions added to database");
                mongoose.connection.close();
            } else {
                inject(n);
            }
        });
    }
    inject(0);

}