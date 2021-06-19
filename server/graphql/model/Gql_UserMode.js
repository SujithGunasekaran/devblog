

class userModel {

    constructor(model, req) {
        this.model = model;
        this.request = req;
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
            const userData = await this.model.findOne({ _id: userid });
            const userPostCount = await context.model.postModel.getPostCountByUser(userid);
            if (!userData) throw new Error('Error while getting user info');
            return {
                userData,
                postcount: userPostCount
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
