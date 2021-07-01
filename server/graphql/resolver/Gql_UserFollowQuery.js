exports.userFollowQuery = {
    getUserFollowFollowing: async (root, { userid }, context) => {
        const userFollowList = await context.model.userFollowModel.getUserFollowList(userid);
        return userFollowList;
    },
    getLoggedUserFollowFollwingList: async (root, args, context) => {
        const userDataInfo = await context.model.userFollowModel.getLoggedUserData();
        return userDataInfo;
    },
    getUserFollowListInfo: async (root, { userid }, context) => {
        const userFollowInfo = await context.model.userFollowModel.getUserFollowInfo(userid);
        return userFollowInfo;
    },
    getUserFollowingListInfo: async (root, { userid }, context) => {
        const userFollowingInfo = await context.model.userFollowModel.getUserFollowingInfo(userid);
        return userFollowingInfo;
    }
}

exports.userFollowMutation = {
    addUserFollow: async (root, { input }, context) => {
        const userFollowInfo = await context.model.userFollowModel.addUserToFollowList(input);
        return userFollowInfo;
    },
    removeUserFollow: async (root, { input }, context) => {
        const userFollowInfo = await context.model.userFollowModel.removedUserFollow(input);
        return userFollowInfo;
    }
}
