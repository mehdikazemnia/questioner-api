const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    kind: {
        type: Number, // 0 is explain, 1 is choose
        required: true
    },
    message: {
        type: String,
        required: true
    },
    options: {
        type: Array
    },
    prev: {
        type: String
    },
    next: {
        type: String
    }
});
const Question = mongoose.model('question', QuestionSchema);
module.exports = Question;