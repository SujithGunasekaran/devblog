const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogPost'
    },
    userinfo: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogUser'
    },
    content: {
        type: String,
        required: true
    },
    parentreplyinfo: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogComment'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.export = mongoose.model('devBlogComment', commentSchema);
