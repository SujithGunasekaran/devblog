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

    // function used to get follow and following id

    async getUserFollowList(userid) {

        const userID = this._getAuthUserID();
        try {
            const userFollowList = await this.model.findOne({ userid }).populate('follower').populate('following');
            const isLoggedInUserFollowing = (userID || userID !== userid) ? await this.model.findOne({ userid: userID, following: userid }) : false
            const result = {
                userData: userFollowList,
                isUserLoggedIn: userID ? true : false,
                isLoggedInUserFollowing: isLoggedInUserFollowing ? true : false

            }
            return result;
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
            const savedUserId = await this.model.findOne({
                userid: loggedUser,
            });
            const savedUserFollowingId = await this.model.findOne({
                userid: followUser,
            });
            const result = {
                followerList: savedUserId?.following ?? [],
                followingList: savedUserFollowingId?.follower ?? []
            }
            return result;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

}

module.exports = userFollowModel;