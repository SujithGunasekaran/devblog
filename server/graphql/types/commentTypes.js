
exports.commentTypes = `
    
    input addCommentInput {
        userinfo : ID
        postid : ID
        content : String
        parentreplyinfo : ID
    }

    type commentuserinfo {
        _id : ID
        username : String
        userprofile : String
    }

    type commentInfo {
        _id : ID
        userinfo : commentuserinfo
        content : String
        parentreplyinfo : commentInfo
        createdAt : String
    }

    type addCommentResult {
        commentList : commentInfo
        loggedUserInfo : commentuserinfo
        commentCount : Int
        postid : ID
    }

    type commentListInfo {
        commentList : [commentInfo]
        loggedUserInfo : commentuserinfo
        commentCount : Int
        postid : ID
    }

`;
