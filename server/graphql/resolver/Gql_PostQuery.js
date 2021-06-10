exports.postQuery = {
    getAllPost: async (root, args, context) => {
        const postList = await context.model.postModel.getPostList();
        return postList;
    }
}

exports.postMutation = {
    createPost: async (root, { input }, context) => {
        const post = await context.model.postModel.publishPost(input);
        return post;
    }
}
