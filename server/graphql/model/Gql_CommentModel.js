
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
            throw new Error(err.message);
        }
    }

    async _getCommentById(commentID) {
        try {
            const commentInfo = await this.model.findOne({ _id: commentID }).populate('parentreplyinfo').populate('userinfo').populate({ path: "parentreplyinfo", populate: "userinfo" });
            if (!commentInfo) return {};
            return {
                commentInfo
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    // function used to get comment by post id

    async getComment(postid) {

        const userInfo = this._getAuthUserInfo();

        try {
            const commentList = await this._getCommentsByPostId(postid);
            const commentCount = await this._countComment(postid);
            const response = {
                commentList: commentList,
                loggedUserInfo: userInfo ? userInfo : null,
                postid,
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

        const userInfo = this._getAuthUserInfo();
        if (!userInfo) throw new Error('User Not Authenticated');

        try {
            const savedComment = await this.model.create({ ...input });
            if (!savedComment) throw new Error('Error while saving the comment');
            const { commentInfo } = await this._getCommentById(savedComment._id);
            const commentCount = await this._countComment(savedComment.postid);
            const response = {
                commentList: commentInfo.toObject(),
                loggedUserInfo: userInfo ? userInfo : null,
                commentCount,
                postid: savedComment.postid
            }
            return response;
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

}

module.exports = commentModel;
