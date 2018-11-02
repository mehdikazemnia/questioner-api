const Question = require('./models/Question.js');
const User = require('./models/User.js');
class QuestionManager {

    /**
     * @param {String} fqid - first question id (should often be like "what's your name")
     */
    constructor(fqid) {
        this.fqid = fqid;
    }

    /**
     * generates a random token
     * again and again if already exists
     */
    generateToken(clb) {
        let rand = Date.now() + Math.round((Math.random() * 1000)) + 1000;
        let token = 't' + rand.toString(32);
        User.findOne({
            token: token
        }).then((user) => {
            if (user) {
                this.generateToken(clb);
            } else {
                clb(token);
            }
        });

    }

    /**
     * join the user, send the generated token
     * @param {Object} req - express
     * @param {Object} res - express
     */
    join(req, res) {
        this.generateToken((token) => {
            let user = new User({
                token: token,
                sheet: {}
            });
            user.save().then(() => {
                res.json({
                    msg: 'welcome, save your token and send it with all POST requests',
                    token: token,
                    next: '/' + this.fqid
                });
            });
        });
    }

    /**
     * render get requests
     * @param {Object} req - express
     * @param {Object} res - express
     */
    render(req, res) {
        Question.findOne({
            id: req.params.qid
        }).then((question) => {
            if (question) {
                let response = {
                    msg: question.message,
                    type: question.kind,
                };
                if (question.kind == 1) response.options = question.options;
                res.json(response);
            } else {
                res.json({
                    err: 'question not found'
                });
            }
        });
    }

    /**
     * respond to post requests
     * @param {Object} req - express
     * @param {Object} res - express
     */
    respond(req, res) {
        let question = res.locals.question;
        let user = res.locals.user;
        let answer;
        if (question.kind == 0) { // explain (no options)
            answer = req.body.answer;
            user.sheet[question.id] = answer;
        } else { // choose (options)
            answer = req.body.answer / 1
            if (answer >= 0 && answer < req.locals.question.options.length) {
                user.sheet[question.id] = req.body.answer;
            }
        }
        user.markModified('sheet');
        user.save().then(() => {
            if (question.kind == 0) {
                res.json({
                    msg: "answer recieved",
                    next: "/" + question.next
                });
            } else {
                res.json({
                    msg: "answer recieved",
                    next: "/" + question.options[answer].next
                });
            }
        });

    }

}
module.exports = QuestionManager;