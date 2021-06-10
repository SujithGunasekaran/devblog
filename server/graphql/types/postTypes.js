
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
    }

`;
