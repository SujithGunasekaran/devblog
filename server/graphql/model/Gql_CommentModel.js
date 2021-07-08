
class commentModel {

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

    async _countComment(postid) {
        const commentCount = await this.model.countDocuments({ postid });
        return commentCount;
    }

    async _getCommentByPostId(postid) {
        try {
            const commentInfo = await this.model.findOne({ postid }).populate('parentreplyinfo').populate('userinfo');
            if (!commentInfo) return {};
            return {
                commentInfo
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    async _getCommentsByPostId(postid) {
        try {
            const commentList = await this.model.find({ postid }).populate('parentreplyinfo').populate('userinfo').populate({ path: "parentreplyinfo", populate: "userinfo" });
            if (!commentList) throw new Error('Error while getting comment');
            return commentList;
        }
        catch (err) {
            throw new Error()
        }
    }

    // function used to get comment by post id

    async getComment(postid) {

        const userID = this._getAuthUserID();

        try {
            const commentList = await this._getCommentsByPostId(postid);
            const commentCount = await this._countComment(postid);
            const response = {
                commentList: commentList,
                loggedUserId: userID,
                commentCount
            };
            return response;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

    // function used to add comment

    async addCommentInfo(input) {

        const userID = this._getAuthUserID();
        if (!userID) throw new Error('User Not Authenticated');

        try {
            const savedComment = await this.model.create({ ...input });
            if (!savedComment) throw new Error('Error while saving the comment');
            const { commentInfo } = await this._getCommentByPostId(savedComment.postid);
            const commentCount = await this._countComment(savedComment.postid);
            const response = {
                ...commentInfo.toObject(),
                loggedUserId: userID,
                commentCount
            }
            return response;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

}

module.exports = commentModel;
