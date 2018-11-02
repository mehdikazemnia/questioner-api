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
        token = 't' + rand.toString(32);
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
            user = new User({
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