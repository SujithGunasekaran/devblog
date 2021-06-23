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
    },
    usercompany: {
        type: String
    },
    userdescription: {
        type: String
    },
    joined: {
        type: Date,
        default: Date.now
    },
    usersavedpost: {
        type: [Schema.Types.ObjectId],
        ref: 'devBlogPost'
    }
})

module.exports = mongoose.model('devBlogUser', userSchema);
