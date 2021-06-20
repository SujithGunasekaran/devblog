

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

    async getUserInfoById(userid, context) {

        try {
            const userData = await this.model.findOne({ _id: userid }).populate('usersavedpost.postid').populate({ path: 'usersavedpost.postid', populate: 'user' });
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

    async updateUserSavedPost(userid, postid, type) {

        const updatedResult = type === 'add' ? await this.model.findOneAndUpdate({ _id: userid }, { $set: { usersavedpost: { postid } } }, { new: true, runValidators: true }) :
            await this.model.findOneAndUpdate({ _id: userid }, { $pull: { usersavedpost: { postid } } }, { new: true, runValidators: true });
        if (!updatedResult) return new Error("Error while updating the saved post");

        return updatedResult;

    }

}

module.exports = userModel;
