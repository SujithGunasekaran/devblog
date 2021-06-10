const userLikedPostModel = require('../../mongodb/model/userLikedPostModel');

class postModel {

    constructor(model, req) {
        this.model = model;
        this.request = req;
    }

    _getAuthUserID() {

        let userID;

        if (!this.request.isAuthenticated()) {
            return null;
        }
        else {
            userID = this.request.user._id;
        }

        return userID;

    }

    async _createPost(post) {

        return await this.model.create(post);

    }

    // function used to get all post list 

    async getPostList() {

        const postList = await this.model.find({}).populate('user');
        return { postList };

    }

    // function used to create post

    async publishPost(post) {

        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        post.user = userID;

        try {
            const createdPost = await this._createPost(post);
            const getCreatedPost = await this.model.findOne({ _id: createdPost._id }).populate('user');
            return getCreatedPost;
        }
        catch (err) {
            throw new Error('Error while creating post');
        }

    }

    // function used to get user liked post id

    async getUserLikedPost() {

        const userID = this._getAuthUserID();

        if (!userID) return { userLikedPostList: [] }

        const userLikedPostData = await userLikedPostModel.find({ userid: userID });
        return { userLikedPostList: userLikedPostData };

    }

    // function used to create new like to post

    async createNewLikeToPost(input) {

        const { likecount, postid, userid } = input;

        try {
            await this.model.findOneAndUpdate({ _id: postid }, { $set: { like: +likecount } }, { new: true, runValidators: true });
            const createdUserLikedPost = await userLikedPostModel.create({ userid, postid });
            const { postList } = await this.getPostList();
            return {
                postList: postList,
                userLikedPostList: [{
                    postid: createdUserLikedPost.postid
                }]
            };
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

}

module.exports = postModel;
