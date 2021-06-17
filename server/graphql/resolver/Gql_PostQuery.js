exports.postQuery = {
    getAllPost: async (root, args, context) => {
        const postList = await context.model.postModel.getPostList();
        return postList;
    },
    getPostById: async (root, { input }, context) => {
        const postInfo = await context.model.postModel.getPostInfoById(input);
        return postInfo;
    },
    getTagList: async (root, args, context) => {
        const tagList = await context.model.postModel.getPopularTags();
        return tagList;
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
    },
    addSaveToPost: async (root, { input }, context) => {
        const postList = await context.model.postModel.createNewSaveToPost(input, context);
        return postList;
    }
}
