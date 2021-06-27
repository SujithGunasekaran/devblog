const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserFollowSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogUser'
    },
    follower: {
        type: [Schema.Types.ObjectId],
        ref: 'devBlogUser'
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: 'devBlogUser'
    }
});

module.exports = mongoose.model('devBlogUserFollowInfo', UserFollowSchema);
