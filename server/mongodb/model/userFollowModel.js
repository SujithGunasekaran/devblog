const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserFollowSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'devBlogUser'
    },
    userfollowerlist: {
        type: [Schema.Types.ObjectId],
        ref: 'devBlogUser'
    },
    userfollowinglist: {
        type: [Schema.Types.ObjectId],
        ref: 'devBlogUser'
    }
});

module.exports = mongoose.model('devBlogUserFollow', UserFollowSchema);
