

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
        return await this.model.create(post).populate('user');
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
            return createdPost;
        }
        catch (err) {
            return 'something went wrong';
        }
    }

}

module.exports = postModel;
