
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
        postid : ID
        content : String
        parentreplyinfo : commentInfo
        createdAt : String
        loggedUserId : ID
        commentCount : Int
    }

    type commentListInfo {
        commentList : [commentInfo]
        loggedUserId : ID
        commentCount : Int
    }

`;
