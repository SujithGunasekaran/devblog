const userLikedPostModel = require('../../mongodb/model/userLikedPostModel');
const userSavedPostModel = require('../../mongodb/model/userSavedPostModel');

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

    // function used to get user saved post id

    async getUserSavedPost() {

        const userID = this._getAuthUserID();

        if (!userID) return { userSavedPostList: [] };

        const userSavedPostData = await userSavedPostModel.find({ userid: userID });
        return { userSavedPostList: userSavedPostData };

    }

    // function used to create new like to post

    async createNewLikeToPost(input) {

        const { likecount, postid, type } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        try {
            await this.model.findOneAndUpdate({ _id: postid }, { $set: { like: +likecount } }, { new: true, runValidators: true });
            type === 'add' ? await userLikedPostModel.create({ userid: userID, postid }) : await userLikedPostModel.findOneAndDelete({ userid: userID, postid });
            const { userLikedPostList } = await this.getUserLikedPost();
            const { postList } = await this.getPostList();
            return {
                postList: postList,
                userLikedPostList: userLikedPostList
            };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    // function userd to create new save to post

    async createNewSaveToPost(input) {

        const { saveCount, postid, type } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        try {
            await this.model.findOneAndUpdate({ _id: postid }, { $set: { saved: +saveCount } }, { new: true, runValidators: true });
            type === 'add' ? await userSavedPostModel.create({ userid: userID, postid }) : await userSavedPostModel.findOneAndDelete({ userid: userID, postid });
            const { userSavedPostList } = await this.getUserSavedPost();
            const { postList } = await this.getPostList();
            return {
                postList: postList,
                userSavedPostList: userSavedPostList
            };
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to get post info by id

    async getPostInfoById(postData) {

        const { postid } = postData;
        const userid = this._getAuthUserID();
        try {
            const postInfo = await this.model.findOne({ _id: postid }).populate('user');
            const loggedUserPostAction = userid ? await userLikedPostModel.findOne({ userid, postid }) : false;
            const loggedUserSaveAction = userid ? await userSavedPostModel.findOne({ userid, postid }) : false;
            const postInfoResult = {
                postInfo,
                isUserLikedThePost: loggedUserPostAction ? true : false,
                isUserSavedThePost: loggedUserSaveAction ? true : false
            }
            return postInfoResult;
        }
        catch (err) {
            throw new Error('Something went wrong while getting post');
        }

    }

}

module.exports = postModel;
