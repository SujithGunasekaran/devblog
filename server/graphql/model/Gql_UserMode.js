const mongoose = require('mongoose');

class userModel {

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

    async getUser() {
        if (this.request.isAuthenticated()) {
            const userInfo = await this.model.findOne({ _id: this.request.user._id }).populate('usersavedpost');
            return userInfo;
        }
        return null;
    }

    signOut() {
        try {
            this.request.logout();
            return true;
        }
        catch (err) {
            throw new Error('user not loggedin');
        }
    }

    // function used to edit userInput 

    async updateUserInfo(input) {

        const userID = this._getAuthUserID();
        if (!userID) throw new Error('User not authenticated');
        const { id, username, userdescription, usercompany } = input;

        try {
            const updatedUserInfo = await this.model.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        username,
                        userdescription,
                        usercompany
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!updatedUserInfo) throw new Error('Error While updating the userInfo');
            return updatedUserInfo;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }


    // function used to get user info by user id

    async getUserInfoById(userid, context) {

        try {
            const userData = await this.model.findOne({ _id: userid }).populate('usersavedpost').populate({ path: 'usersavedpost', populate: 'user' });
            const userPostCount = await context.model.postModel.getPostCountByUser(userid);
            const loggedUserInfo = this._getAuthUserInfo();
            if (!userData) throw new Error('Error while getting user info');
            return {
                userData,
                postcount: userPostCount,
                loggedUserInfo: loggedUserInfo ? loggedUserInfo : null
            };
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to get user created post list

    async getUserPostList(userid, context) {

        try {
            const postList = await context.model.postModel.getPostByUser(userid);
            const loggedUserInfo = this._getAuthUserInfo();
            if (!postList) throw new Error('Error while getting post list');
            return {
                postInfo: postList,
                loggedUserInfo: loggedUserInfo ? loggedUserInfo : null
            };
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to delete user created post

    async deleteUserCreatedPost(input, context) {

        const { postid, userid } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        try {
            const deletedPostID = await context.model.postModel.deletePost(postid);
            const postList = await context.model.postModel.getPostByUser(userid);
            const loggedUserInfo = this._getAuthUserInfo();
            await this.model.findOneAndUpdate(
                { _id: userid },
                {
                    $pull: {
                        usersavedpost: mongoose.Types.ObjectId(postid)
                    }
                },
                { runValidators: true, new: true }
            );
            const userData = await this.model.findOne({ _id: userid }).populate('usersavedpost').populate({ path: 'usersavedpost', populate: 'user' });
            const userPostCount = await context.model.postModel.getPostCountByUser(userid);
            return {
                userData,
                postcount: userPostCount,
                postInfo: postList,
                loggedUserInfo: loggedUserInfo ? loggedUserInfo : null,
                message: 'Post deleted successfully'
            }
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to update the user saved post list

    async updateUserSavedPost(userid, postid, type) {

        const updatedResult = type === 'add' ? await this.model.findOneAndUpdate(
            { _id: userid },
            {
                $addToSet: {
                    usersavedpost: mongoose.Types.ObjectId(postid)
                }
            },
            { new: true, runValidators: true }
        )
            : await this.model.findOneAndUpdate(
                { _id: userid },
                {
                    $pull: {
                        usersavedpost: mongoose.Types.ObjectId(postid)
                    }
                },
                { new: true, runValidators: true }
            );
        if (!updatedResult) return new Error("Error while updating the saved post");

        return updatedResult;

    }

}

module.exports = userModel;
