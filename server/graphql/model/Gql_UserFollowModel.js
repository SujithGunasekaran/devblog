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
            const isLoggedInUserFollowing = (loggedUserId && loggedUserId !== followUserId) ? await this.model.findOne({ userid: loggedUserId, following: followUserId }) : false
            const result = {
                isLoggedInUserFollowing: isLoggedInUserFollowing ? true : false,
                isUserLoggedIn: loggedUserId ? true : false,
            }
            return result;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    // function used to get user followInfo

    async _getUserFollowInfoList(userid) {
        const userData = await this.model.findOne({ userid }).populate('follower');
        if (!userData) throw new Error('Error while getting user follow list info');
        const result = {
            userData
        }
        return result;
    }

    // function used to get user following info

    async _getUserFollowingInfoList(userid) {
        const userData = await this.model.findOne({ userid }).populate('following');
        if (!userData) throw new Error('Error while getting user follow list info');
        const result = {
            userData
        }
        return result;
    }


    // function will return userFollowArray and userFollowing Array

    async _getFollowFollowingArray(userid) {

        const userData = await this.model.findOne({ userid });
        if (!userData) throw new Error('Error while getting user data');
        const result = {
            userid: userData.userid,
            userFollowArray: userData.follower,
            userFollowingArray: userData.following
        }
        return result;

    }


    // function used to get logged user follow and following array

    async getLoggedUserData() {
        const userID = this._getAuthUserID();
        if (!userID) return [];
        try {
            const userResponse = await this._getFollowFollowingArray(userID);
            return userResponse;
        }
        catch (err) {

        }
    }

    // function used to get follow and following id

    async getUserFollowList(userid) {
        const userID = this._getAuthUserID();
        try {
            const responseData = await this._getUserFollowData(userID, userid);
            const userInfo = await this._getFollowFollowingArray(userid);
            const result = {
                ...responseData,
                ...userInfo
            }
            return result;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    // function used to get user follow info

    async getUserFollowInfo(userid) {
        try {
            const responseData = await this._getUserFollowInfoList(userid);
            return responseData;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    // function used to get user following info

    async getUserFollowingInfo(userid) {
        try {
            const responseData = await this._getUserFollowingInfoList(userid);
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
            let responseData = await this._getUserFollowData(loggedUser, followUser);
            const visitorUserFollowInfo = await this.model.findOne(
                {
                    userid: followUser,
                    follower: {
                        $in: [
                            loggedUser
                        ]
                    }
                }
            ).populate('follower');
            const loggedUserFollowingInfo = await this.model.findOne(
                {
                    userid: loggedUser,
                    following: {
                        $in: [
                            followUser
                        ]
                    }
                }
            ).populate('following');
            responseData = {
                ...responseData,
                visitorUserID: followUser,
                loggedUserID: loggedUser,
                loggedUserFollowingArray: savedUserFollowInfo.following,
                visitorFollowArray: savedUserFollowingInfo.follower,
                visitorFollowInfo: visitorUserFollowInfo.follower,
                loggedFollowingInfo: loggedUserFollowingInfo.following
            };
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
            const loggedFollowListInfo = await this.model.findOne({ userid: loggedUser });
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
            const visitorFollowInfo = await this.model.findOne({ userid: followUser });
            let responseData = await this._getUserFollowData(loggedUser, followUser);
            const visitorUserFollowInfo = await this.model.findOne(
                {
                    userid: followUser
                }
            ).populate('follower');
            const loggedUserFollowingInfo = await this.model.findOne(
                {
                    userid: loggedUser
                }
            ).populate('following');
            responseData = {
                ...responseData,
                visitorUserID: followUser,
                loggedUserID: loggedUser,
                loggedUserFollowingArray: loggedFollowListInfo.following,
                visitorFollowArray: visitorFollowInfo.follower,
                visitorFollowInfo: visitorUserFollowInfo.follower,
                loggedFollowingInfo: loggedUserFollowingInfo.following
            };
            return responseData;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

}

module.exports = userFollowModel;
