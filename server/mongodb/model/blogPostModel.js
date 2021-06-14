const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogUser'
    },
    tags: {
        type: String
    },
    userliked: {
        type: Array,
        default: []
    },
    usersaved: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('devBlogPost', blogPostSchema);
