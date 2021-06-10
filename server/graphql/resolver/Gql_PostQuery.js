exports.postQuery = {
    getAllPost: async (root, args, context) => {
        const postList = await context.model.postModel.getPostList();
        return postList;
    },
    userLikedPost: async (root, args, context) => {
        const likedPostList = await context.model.postModel.getUserLikedPost();
        return likedPostList;
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
