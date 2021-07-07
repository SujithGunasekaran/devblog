const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childCommentSchema = new Schema({
    postid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogPost'
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogUser'
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const commentSchema = new Schema({
    postid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogPost'
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogUser'
    },
    content: {
        type: String,
        required: true
    },
    child: [childCommentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.export = mongoose.model('devBlogComment', commentSchema);
