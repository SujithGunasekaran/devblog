exports.userFollowQuery = {
    getUserFollowFollowing: async (root, { userid }, context) => {
        const userFollowList = await context.model.userFollowModel.getUserFollowList(userid);
        return userFollowList;
    }
}

exports.userFollowMutation = {
    addUserFollow: async (root, { input }, context) => {
        const userFollowInfo = await context.model.userFollowModel.addUserToFollowList(input);
        return userFollowInfo;
    }
}
