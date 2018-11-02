const mongoose = require('mongoose');
const questions = require('./storage/questions.json');
const Question = require('./models/Question.js');

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/questioner', {
    useNewUrlParser: true
});
mongoose.connection
    .once('open', init)
    .on('error', console.error);

function init() {
    function inject(n) {
        let question = new Question(questions[n]);
        question.save().then(() => {
            n++;
            if (n == questions.length) {
                console.log(n+" questions added to database");
                mongoose.connection.close();
            } else {
                inject(n);
            }
        });
    }
    inject(0);

}