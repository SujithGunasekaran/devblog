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

    type postArray {
        postid : postid
    }

    type userInfo {
        _id : ID
        userid : String
        username : String
        userprofile : String
        userdescription : String
        joined : String
        usersavedpost : [postArray]
    }

    type userDataInfo {
        userData : userInfo
        postcount : Int
        loggedUserInfo : userInfo
    }

    type userPostList {
        postInfo : [post]
        loggedUserInfo : userInfo
    }

`;
