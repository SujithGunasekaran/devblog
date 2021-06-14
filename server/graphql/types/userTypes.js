exports.userTypes = `

    type postArray {
        postid : ID
    }

    type userInfo {
        _id : ID
        userid : String
        username : String
        userprofile : String
        usersavedpost : [postArray] 
    }

`;
