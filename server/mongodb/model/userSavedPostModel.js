const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSavedPostSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogUser'
    },
    postid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogPost'
    }
});

module.exports = mongoose.model('devBlogUserSavedPost', userSavedPostSchema);
