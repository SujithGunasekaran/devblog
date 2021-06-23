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

    input deletePost {
        postid : ID
        userid : ID
    }

`;
