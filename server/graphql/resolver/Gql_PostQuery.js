exports.postQuery = {
    getAllPost: async (args, context) => {
        const postList = await context.model.postModel.getPostList();
        return postList;
    }
}

exports.postMutation = {
    createPost: async ({ input }, context) => {
        const post = await context.model.postModel.publishPost(input);
        console.log("post return", post);
        return post;
    }
}
