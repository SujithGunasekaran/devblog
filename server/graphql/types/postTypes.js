
exports.postTypes = `

    type userData {
        _id : ID
        username : String
        userprofile : String
    }

    type post {
        _id : ID,
        title : String
        content : String
        user : userData
        like : Int
        saved : Int
        tags : String
        createdAt : String
    }

    type allPost {
        postList : [post]
    }

    input createPostInput {
        title : String!
        content : String!
        tags : String
        like : Int
        saved : Int
    }

    type postIdArray {
        postid : ID
    }

    type likePostByUser {
        userLikedPostList : [postIdArray]
    }

    type savedPostByUser {
        userSavedPostList : [postIdArray]
    }

    type likeToPostResult {
        postList : [post],
        userLikedPostList : [postIdArray]
    }

    type saveToPostResult {
        postList : [post],
        userSavedPostList : [postIdArray]
    }

    type postById {
        postInfo : post,
        isUserLikedThePost : Boolean
        isUserSavedThePost : Boolean
    }

    input likeToPost {
        type : String
        likecount : Int
        postid : ID
    }

    input saveToPost {
        type : String
        saveCount : Int
        postid : ID
    }

    input getPostInfo {
        postid : ID
    }



`;
