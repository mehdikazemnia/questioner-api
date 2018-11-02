const Question = require('./models/Question.js');
class QuestionManager {

    /**
     * @param {String} fqid - first question id (should often be like "what's your name")
     */
    constructor(fqid) {
        this.fqid = fqid;
    }

    /**
     * render get requests
     * @param {Object} req - express
     * @param {Object} res - express
     */
    render(req, res) {
        
    }

    /**
     * respond to post requests
     * @param {Object} req - express
     * @param {Object} res - express
     */
    respond(req, res) {

    }

}
module.exports = QuestionManager;