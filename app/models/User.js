const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    sheet: {
        type: Array
    }
});
const User = mongoose.model('user', UserSchema);
module.exports = User;