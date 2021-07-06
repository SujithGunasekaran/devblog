const tagsModel = require('../../mongodb/model/tagsModel');
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

    async getPostList(input) {

        const postPerRequest = 5;
        const { skipPost, startDate } = input;

        const totalNoOfPost = startDate ? await this.model.countDocuments({ createdAt: { $gte: startDate, $lte: new Date() } }) : await this.model.countDocuments({});
        const hasMorePost = totalNoOfPost - (skipPost + postPerRequest);

        const postList = startDate ?
            await this.model.find({
                createdAt: {
                    $gte: startDate,
                    $lte: new Date()
                }
            })
                .sort({ createdAt: 'desc' })
                .skip(+skipPost)
                .limit(+postPerRequest)
                .populate('user')
            :
            await this.model.find({})
                .sort({ createdAt: 'desc' })
                .skip(+skipPost)
                .limit(+postPerRequest)
                .populate('user');
        if (!postList) throw new Error('Error while getting post list');
        const loggedUserInfo = this._getAuthUserInfo();
        const response = {
            postList,
            postToBeSkipped: +skipPost + postPerRequest,
            hasMore: hasMorePost > 0 ? true : false,
            loggedUserInfo: loggedUserInfo ? loggedUserInfo : null
        };
        return response;

    }

    // function used to create post

    async publishPost(post) {

        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        post.user = userID;

        try {
            const createdPost = await this._createPost(post);
            if (!createdPost) throw new Error('Error while creating post');
            const getCreatedPost = await this.model.findOne({ _id: createdPost._id }).populate('user');
            return getCreatedPost;
        }
        catch (err) {
            throw new Error('Error while creating post');
        }

    }

    // function used to edit post 

    async editPostInfo(input) {
        const { postid, title, content, tags } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        try {
            const editedPost = await this.model.findOneAndUpdate(
                {
                    _id: postid, user: userID
                },
                {
                    $set: {
                        title,
                        content,
                        tags
                    }
                },
                {
                    new: true, runValidators: true
                }
            );
            if (!editedPost) throw new Error('Error while editing post');
            const getEditedPost = await this.model.findOne({ _id: editedPost._id }).populate('user');
            if (!getEditedPost) throw new Error('Post Edited Successfully, But failed to get');
            return getEditedPost;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to create new like to post

    async createNewLikeToPost(input) {

        const { postid, type } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        try {
            type === 'add' ? await this.model.findOneAndUpdate(
                { _id: postid },
                {
                    $addToSet: {
                        userliked: userID
                    }
                },
                { new: true, runValidators: true }
            )
                : await this.model.findOneAndUpdate(
                    { _id: postid },
                    {
                        $pull: {
                            userliked: userID
                        }
                    },
                    { new: true, runValidators: true }
                )
            const postResult = await this.model.findOne({ _id: postid });
            return {
                userliked: postResult.userliked,
                postid
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
            type === 'add' ? await this.model.findOneAndUpdate(
                { _id: postid },
                {
                    $addToSet: {
                        usersaved: userID
                    }
                },
                { new: true, runValidators: true }
            )
                : await this.model.findOneAndUpdate(
                    { _id: postid },
                    {
                        $pull: {
                            usersaved: userID
                        }
                    },
                    { new: true, runValidators: true }
                )
            await context.model.userModel.updateUserSavedPost(userID, postid, type);
            const postResult = await this.model.findOne({ _id: postid });
            return {
                usersaved: postResult.usersaved,
                postid
            }
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to get post info by id

    async getPostInfoById(postData, context) {

        const { postid } = postData;
        const userid = this._getAuthUserID();
        try {
            const postInfo = await this.model.findOne({ _id: postid }).populate('user');
            if (!postInfo) throw new Error('Error while getting the post info')
            const isLoggedInUserFollowing = await context.model.userFollowModel.checkIfLoggedInUserFollowing(userid, postInfo.user._id);
            if (!postInfo) throw new Error('Error while getting post info');
            const postInfoResult = {
                postInfo,
                loggedUserid: userid ? userid : null,
                isLoggedInUserFollowing: isLoggedInUserFollowing ? true : false
            }
            return postInfoResult;
        }
        catch (err) {
            throw new Error(err.message)
        }

    }

    // function used to get post list by user in postInfo page

    async getPostInfoListByUser(postid) {

        try {
            const postInfo = await this.model.findOne({ _id: postid });
            if (!postInfo) throw new Error('Error while getting postInfo');
            const userPostList = await this.model.find({ user: postInfo.user }).limit(5);
            if (!userPostList) throw new Error('Error while getting user post list');
            return {
                postList: userPostList
            }
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function use to get tag list

    async getPopularTags() {
        try {
            const tagList = await tagsModel.find({});
            if (tagList.length === 0) throw new Error('Error while getting tagList');
            return tagList[0];
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    // function used to get post count by user id

    async getPostCountByUser(userid) {

        try {
            const postCount = await this.model.countDocuments({ user: userid });
            return postCount ? postCount : 0;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to get post by user for user porfile page and function called from userModel

    async getPostByUser(userid) {
        try {
            const postList = await this.model.find({ user: userid }).populate('user');
            if (!postList) throw new Error('Error while getting user post list');
            return postList;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to delete post by user and function called from userModel

    async deletePost(postid) {

        try {
            const deletedPost = await this.model.findOneAndDelete({ _id: postid });
            if (!deletedPost) throw new Error('Errow while deleting the post');
            return deletedPost;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

}

module.exports = postModel;
