const mongoose = require('mongoose');


class userFollowModel {

    constructor(model, req) {
        this.model = model;
        this.request = req
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

    async _createIfUserDocumentNotExist(loggedUser, followUser) {
        const currentUser = await this.model.findOne({ userid: loggedUser });
        const followerUser = await this.model.findOne({ userid: followUser });
        if (!currentUser) await this.model.create({ userid: loggedUser });
        if (!followerUser) await this.model.create({ userid: followUser });
    }

    /**
     * Logged user id as first parameter and followUser id as second parameter
     * It return the followUser data and is loggedin user follows the followUser id.
     * @param {*} loggedUserId 
     * @param {*} followUserId 
     * @returns 
     */

    async _getUserFollowData(loggedUserId, followUserId) {

        try {
            const userFollowList = await this.model.findOne({ userid: followUserId }).populate('follower').populate('following');
            const loggedUserData = await this.model.findOne({ userid: loggedUserId }).populate('follower').populate('following');
            const isLoggedInUserFollowing = (loggedUserId && loggedUserId !== followUserId) ? await this.model.findOne({ userid: loggedUserId, following: followUserId }) : false
            const result = {
                userData: userFollowList,
                loggedUserData,
                isUserLoggedIn: loggedUserId ? true : false,
                isLoggedInUserFollowing: isLoggedInUserFollowing ? true : false

            }
            return result;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to get follow and following id

    async getUserFollowList(userid) {

        const userID = this._getAuthUserID();
        try {
            const responseData = await this._getUserFollowData(userID, userid);
            return responseData;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to add user to logged user follow list

    async addUserToFollowList(input) {

        const { loggedUser, followUser } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        await this._createIfUserDocumentNotExist(loggedUser, followUser);

        try {
            const savedUserFollowInfo = await this.model.findOneAndUpdate(
                {
                    userid: loggedUser
                },
                {
                    $addToSet: {
                        following: mongoose.Types.ObjectId(followUser)
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!savedUserFollowInfo) throw new Error('Error while saving the following user');
            const savedUserFollowingInfo = await this.model.findOneAndUpdate(
                {
                    userid: followUser
                },
                {
                    $addToSet: {
                        follower: mongoose.Types.ObjectId(loggedUser)
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!savedUserFollowingInfo) throw new Error('Error while saving the following user data');
            const responseData = await this._getUserFollowData(loggedUser, followUser);
            return responseData;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to remove user follow

    async removedUserFollow(input) {

        const { loggedUser, followUser } = input;
        const userID = this._getAuthUserID();

        if (!userID) throw new Error('User not authenticated');

        try {
            const savedUserFollowInfo = await this.model.findOneAndUpdate(
                {
                    userid: loggedUser
                },
                {
                    $pull: {
                        following: mongoose.Types.ObjectId(followUser)
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!savedUserFollowInfo) throw new Error('Error while removing the followed user');
            const savedUserFollowingInfo = await this.model.findOneAndUpdate(
                {
                    userid: followUser
                },
                {
                    $pull: {
                        follower: mongoose.Types.ObjectId(loggedUser)
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!savedUserFollowingInfo) throw new Error('Error while removing the followed user data');
            const responseData = await this._getUserFollowData(loggedUser, followUser);
            return responseData;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

}

module.exports = userFollowModel;
