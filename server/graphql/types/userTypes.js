exports.userTypes = `

    type postArray {
        postid : ID
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
    }

    type userPostList {
        postInfo : [post]
        loggedUserInfo : userInfo
    }

`;
