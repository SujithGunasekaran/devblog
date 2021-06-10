

class postModel {

    constructor(model, req) {
        this.model = model;
        this.request = req;
    }

    async getPostList() {
        const postList = await this.model.find({}).populate('user');
        return { postList };
    }

    async _createPost(post) {
        return await this.model.create(post);
    }

    async publishPost(post) {

        let user;

        if (!this.request.isAuthenticated()) {
            throw new Error('user not authenticated');
        }
        else {
            user = this.request.user;
        }

        post.user = user._id;

        try {
            const createdPost = await this._createPost(post);
            const getCreatedPost = await this.model.findOne({ _id: createdPost._id }).populate('user');
            return getCreatedPost;
        }
        catch (err) {
            throw new Error('Something Went Wrong');
        }
    }

}

module.exports = postModel;
