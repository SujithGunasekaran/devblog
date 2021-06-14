const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSavedPostSchema = new Schema({
    postid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogPost'
    }
});

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
    usersavedpost: [userSavedPostSchema]
})

module.exports = mongoose.model('devBlogUser', userSchema);
