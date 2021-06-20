const passport = require('passport');

exports.userQuery = {

    getUserInfo: (root, args, context) => {
        const userInfo = context.model.userModel.getUser();
        return userInfo;
    },
    getUserById: async (root, { userid }, context) => {
        const userInfo = await context.model.userModel.getUserInfoById(userid, context);
        return userInfo;
    },
    getUserPosts: async (root, { userid }, context) => {
        const postList = await context.model.userModel.getUserPostList(userid, context);
        return postList;
    },
    logout: (root, args, context) => {
        const message = context.model.userModel.signOut();
        return message;
    }

}
