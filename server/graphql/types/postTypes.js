
exports.postTypes = `

    type postIdArray {
        title : String
    }

    type userData {
        _id : ID
        username : String
        userprofile : String
        usersavedpost : [postIdArray]
    }

    type post {
        _id : ID,
        title : String
        content : String
        user : userData
        tags : String
        createdAt : String
        userliked : [String],
        usersaved : [String]
    }

    type allPost {
        postList : [post]
        loggedUserInfo : userData
    }

    input createPostInput {
        title : String!
        content : String!
        tags : String
    }

    type likeToPostResult {
        userliked : [String]
    }

    type saveToPostResult {
        usersaved : [String]
    }

    type postById {
        postInfo : post,
        isUserLikedThePost : Boolean
        isUserSavedThePost : Boolean
    }

    input likeToPost {
        type : String
        postid : ID
    }

    input saveToPost {
        type : String
        postid : ID
    }

    input getPostInfo {
        postid : ID
    }



`;
