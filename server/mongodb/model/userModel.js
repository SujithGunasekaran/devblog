const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userprofile: {
        type: String
    }
})

module.exports = mongoose.model('devBlogUser', userSchema);
