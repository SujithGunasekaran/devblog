exports.postQuery = {
    getAllPost: async (root, { input }, context) => {
        const postList = await context.model.postModel.getPostList(input);
        return postList;
    },
    getPostById: async (root, { input }, context) => {
        const postInfo = await context.model.postModel.getPostInfoById(input, context);
        return postInfo;
    },
    getPostByUser: async (root, { postid }, context) => {
        const postList = await context.model.postModel.getPostInfoListByUser(postid);
        return postList;
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
    editPost: async (root, { input }, context) => {
        const post = await context.model.postModel.editPostInfo(input);
        return post;
    },
    addLikeToPost: async (root, { input }, context) => {
        const postList = await context.model.postModel.createNewLikeToPost(input);
        return postList;
    },
    addSaveToPost: async (root, { input }, context) => {
        const postList = await context.model.postModel.createNewSaveToPost(input, context);
        return postList;
    },
    postSearch: async (root, { text }, context) => {
        const searchResult = await context.model.postModel.getPostNameByText(text);
        return searchResult;
    }
}
