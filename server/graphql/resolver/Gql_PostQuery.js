exports.postQuery = {
    getAllPost: async (root, args, context) => {
        const postList = await context.model.postModel.getPostList();
        return postList;
    },
    userLikedPost: async (root, args, context) => {
        const likedPostList = await context.model.postModel.getUserLikedPost();
        return likedPostList;
    },
    getPostById: async (root, { input }, context) => {
        const postInfo = await context.model.postModel.getPostInfoById(input);
        return postInfo;
    }
}

exports.postMutation = {
    createPost: async (root, { input }, context) => {
        const post = await context.model.postModel.publishPost(input);
        return post;
    },
    addLikeToPost: async (root, { input }, context) => {
        const postList = await context.model.postModel.createNewLikeToPost(input);
        return postList;
    }
}
