
exports.postTypes = `

    type postIdArray {
        title : String
    }

    type userData {
        _id : ID
        username : String
        userprofile : String
        userdescription : String
        usercompany : String
        joined : String
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
        hasMore : Boolean
        postToBeSkipped : Int
        loggedUserInfo : userData
    }

    input createPostInput {
        title : String!
        content : String!
        tags : String
    }

    type likeToPostResult {
        userliked : [String]
        postid : ID
    }

    type saveToPostResult {
        usersaved : [String]
        postid : ID
    }

    type postById {
        postInfo : post
        loggedUserid : ID
        isLoggedInUserFollowing : Boolean
    }

    type tagList {
        taglist : [String]
    }

    type postByUser {
        postList : [post]
    }

    type result {
        _id : ID
        title : String
    }

    type postSearchResult {
        postResult : [result]
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

    input editPostInfo {
        postid : ID
        title : String!
        content : String!
        tags : String
    }

    input allPostInput {
        startDate : String,
        skipPost : Int
    }


`;
