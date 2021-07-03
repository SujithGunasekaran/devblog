exports.userTypes = `

    type postid {
        _id : ID,
        title : String
        user : userData
        tags : String
        createdAt : String
        userliked : [String],
        usersaved : [String]
    }

    type userInfo {
        _id : ID
        userid : String
        username : String
        userprofile : String
        userdescription : String
        joined : String
        usersavedpost : [postid]
    }

    type userDataInfo {
        userData : userInfo
        postcount : Int
        loggedUserInfo : userInfo
    }

    type userPostList {
        userData : userInfo
        postcount : Int
        postInfo : [post]
        loggedUserInfo : userInfo
        message : String
    }

    type userFollowResult {
        followerList : [ID]
        followingList : [ID]
    }

    type userFollowFollowingInfo {
        userid : ID
        follower : [userInfo]
        following : [userInfo]
    }

    type getUserFollow {
        userid : ID
        isUserLoggedIn : Boolean
        isLoggedInUserFollowing : Boolean
        userFollowArray : [ID]
        userFollowingArray : [ID]
    }

    type followListInfo {
        userData : userFollowFollowingInfo
    }

    type followingListInfo {
        userData : userFollowFollowingInfo
    }

    type FollowFollowingResult {
        visitorUserID : ID
        visitorFollowArray : [ID]
        loggedUserID : ID
        loggedUserFollowingArray : [ID]
        isLoggedInUserFollowing : Boolean
        isUserLoggedIn : Boolean
        visitorFollowInfo : [userInfo]
        loggedFollowingInfo : [userInfo]
    }

    input deletePost {
        postid : ID
        userid : ID
    }

    input userFollowInput {
        loggedUser : ID,
        followUser : ID
    }

    input userFollowing {
        loggedUser : ID,
        followUser : ID
    }

`;
