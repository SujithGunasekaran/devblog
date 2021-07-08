exports.commentQuery = {
    getCommentByPostId: async (root, { postid }, context) => {
        const commentList = await context.model.commentModel.getComment(postid);
        return commentList;
    }
};

exports.commentMutation = {
    addComment: async (root, { input }, context) => {
        const savedCommentInfo = await context.model.commentModel.addCommentInfo(input);
        return savedCommentInfo;
    }
};
