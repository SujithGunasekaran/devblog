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

    _getAuthUserInfo() {

        let userInfo;

        if (!this.request.isAuthenticated()) {
            return null;
        }
        else {
            userInfo = this.request.user;
        }

        return userInfo;

    }

    async _createPost(post) {

        return await this.model.create(post);

    }

    // function used to get all post list 

    async getPostList() {

        const postList = await this.model.find({}).populate('user');
        const loggedUserInfo = this._getAuthUserInfo();
        return { postList, loggedUserInfo: loggedUserInfo ? loggedUserInfo : null };

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

    // function used to create new like to post

    async createNewLikeToPost(input) {

        const { postid, type } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        try {
            type === 'add' ? await this.model.findOneAndUpdate({ _id: postid }, { $addToSet: { userliked: userID } }, { new: true, runValidators: true }) : await this.model.findOneAndUpdate({ _id: postid }, { $pull: { userliked: userID } }, { new: true, runValidators: true })
            const postResult = await this.model.findOne({ _id: postid });
            return {
                userliked: postResult.userliked,
            }
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function userd to create new save to post

    async createNewSaveToPost(input, context) {

        const { postid, type } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        try {
            type === 'add' ? await this.model.findOneAndUpdate({ _id: postid }, { $addToSet: { usersaved: userID } }, { new: true, runValidators: true }) : await this.model.findOneAndUpdate({ _id: postid }, { $pull: { usersaved: userID } }, { new: true, runValidators: true })
            await context.model.userModel.updateUserSavedPost(userID, postid, type);
            const postResult = await this.model.findOne({ _id: postid });
            return {
                usersaved: postResult.usersaved
            }
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
            const loggedUserLikeAction = userid ? postInfo.userliked.includes(userid) : false;
            const loggedUserSaveAction = userid ? postInfo.usersaved.includes(userid) : false;
            const postInfoResult = {
                postInfo,
                isUserLikedThePost: loggedUserLikeAction ? true : false,
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
