const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    kind: {
        type: Number // 0 is explain, 1 is choose
    },
    message: {
        type: String,
        required: true
    },
    options: {
        type: Array
    }
});
const Question = mongoose.model('question', QuestionSchema);
module.exports = Question;