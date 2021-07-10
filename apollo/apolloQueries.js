import { gql } from '@apollo/client';

// auth queries start

export const GET_USER_INFO = gql`
    query GetUser {
        getUserInfo {
            _id
            userid
            username
            userprofile
       }
    }
`;

export const GET_USER_INFO_BY_ID = gql`
    query GetUserInfoById($userid : ID) {
        getUserById(userid : $userid) {
            userData {
                _id
                username
                userprofile
                userdescription
                joined
                usersavedpost {
                    _id
                    title
                    tags
                    createdAt
                    userliked
                    usersaved
                    user {
                        _id
                        username
                        userprofile
                    }
                }
            }
            loggedUserInfo {
                _id
                username
                userprofile
            }
            postcount
        }
    }
`;

export const GET_USER_POST_LIST = gql`
    query GetUserPostList($userid : ID) {
        getUserPosts(userid : $userid) {
            postInfo {
                _id
                title
                tags
                createdAt
                userliked
                usersaved
                user {
                    _id
                    username
                    userprofile
                }
            }
            loggedUserInfo {
                _id
                username
                userprofile
            }
        }
    }
`;

export const DELETE_USER_CREATED_POST = gql`
    mutation DeleteUserCreatePost(
        $postid : ID
        $userid : ID
    ){
        deleteUserPosts(input : {
            postid : $postid
            userid : $userid
        }){
            userData {
                _id
                username
                userprofile
                userdescription
                joined
                usersavedpost {
                    _id
                    title
                    tags
                    createdAt
                    userliked
                    usersaved
                }
            }
            postInfo {
                _id
                title
                tags
                createdAt
                userliked
                usersaved
                user {
                    _id
                    username
                    userprofile
                }
            }
            loggedUserInfo {
                _id
                username
                userprofile
            }
            message
            postcount
        }
    }
`;

const followFollowingData = `
    postId
    visitorUserID
    loggedUserID
    visitorFollowArray
    loggedUserFollowingArray
    visitorFollowInfo{
        _id
        username
        userprofile
    }
    loggedFollowingInfo{
        _id
        username
        userprofile
    }
    isLoggedInUserFollowing
    isUserLoggedIn
`;

export const GET_VISITOR_USER_INFO = gql`
    query GetUserFollowFollwing($userid : ID) {
        getUserFollowFollowing(userid : $userid){
            userid
            userFollowArray
            userFollowingArray
            isUserLoggedIn
            isLoggedInUserFollowing
        }
    }
`;

export const GET_LOGGED_USER_INFO = gql`
    query GetUserFollowFollowingList {
        getLoggedUserFollowFollwingList {
            userid
            userFollowArray
            userFollowingArray
        }
    }
`;

export const GET_FOLLOW_LIST_INFO = gql`
    query GetUserFollowListInfo($userid : ID) {
        getUserFollowListInfo(userid : $userid){
            userData {
                userid
                follower {
                    _id
                    username
                    userprofile
                }
            }
        }
    }
`;

export const GET_FOLLOWING_LIST_INFO = gql`
    query GetUserFollowingListInfo($userid : ID) {
        getUserFollowingListInfo(userid : $userid){
            userData {
                userid
                following {
                    _id
                    username
                    userprofile
                }
            }
        }
    }
`

export const FOLLOW_USER = gql`
    mutation UserFollow(
        $loggedUser : ID
        $followUser : ID
        $postId : ID
    )
    {
        addUserFollow(
        input : {
            loggedUser : $loggedUser
            followUser : $followUser
            postId : $postId
        })
        {
            ${followFollowingData}
        }
    }
`;

export const REMOVE_FOLLOW_USER = gql`
    mutation RemoveUserFollow(
        $loggedUser : ID
        $followUser : ID
        $postId : ID
    )
    {
        removeUserFollow(
        input : {
            loggedUser : $loggedUser
            followUser : $followUser
            postId : $postId
        })
        {
            ${followFollowingData}
        }
    }
`

export const USER_LOGOUT = gql`
    query Logout {
        logout
    }
`;


// auth queries end


// post queries start


export const GET_POST_LIST = gql`
    query GetPostList(
        $startDate : String
        $skipPost : Int
    ){
        getAllPost(input : {
            startDate : $startDate
            skipPost : $skipPost
        }){
            postList {
                _id
                title
                tags
                createdAt
                userliked
                usersaved
                user {
                    _id
                    username
                    userprofile
                }
            }
            hasMore
            postToBeSkipped
            loggedUserInfo {
                _id
                username
                userprofile
            }
        }
    }
`;

export const GET_TAG_LIST = gql`
    query GetTagList {
        getTagList {
            taglist
        }
    }
`;

export const GET_POST_BY_ID = gql`
    query GetPostById(
        $postid : ID
    ){
        getPostById(input : {
            postid : $postid
        }){
            postInfo {
                _id
                title
                content
                tags
                userliked
                usersaved
                createdAt
                user {
                    _id
                    username
                    userprofile
                    userdescription
                    joined
                }
            }
            loggedUserid
            isLoggedInUserFollowing
        }
    }
`;

export const GET_POST_BY_USER = gql`
    query GetPostByUser($postid : ID) {
        getPostByUser(postid : $postid){
            postList {
                _id
                title
                tags
            }
        }
    }
`

export const CREATE_POST = gql`
    mutation CreatePost(
        $title : String!
        $content : String!
        $tags : String
    ){
        createPost(input : {
            title : $title
            content : $content
            tags : $tags
        })
        {
            _id
            title
            userliked
            usersaved
            tags
            createdAt
            user {
                _id
                username
                userprofile
            }
        }
    }
`;

export const EDIT_POST_INFO = gql`
    mutation EditPostInfo(
        $postid : ID
        $title : String!
        $content : String!
        $tags : String
    ){
        editPost(input : {
            postid : $postid
            title : $title
            content : $content
            tags : $tags
        })
        {
            _id
            title
            userliked
            usersaved
            tags
            createdAt
            user {
                _id
                username
                userprofile
            }
        }
    }
`;

export const SET_POST_LIKE = gql`
    mutation AddLikeToPost(
        $postid : ID
        $type : String
    ){
        addLikeToPost(input : {
            postid : $postid
            type : $type
        }) 
        {
            userliked
            postid
        }
    }
`;

export const SET_POST_SAVE = gql`
    mutation AddSaveToPost(
        $postid : ID
        $type : String
    ){
        addSaveToPost(input : {
            postid : $postid
            type : $type
        })
        {
            usersaved
            postid
        }
    }   
`


// post queries end



// comment queries start


export const GET_COMMENT_BY_POST_ID = gql`
    query GetCommentList($postid : ID) {
        getCommentByPostId(postid : $postid){
            commentList {
                _id
                userinfo {
                    _id
                    username
                    userprofile
                }
                parentreplyinfo {
                    _id
                    userinfo {
                        _id
                        username
                        userprofile
                    }
                    content
                }
                content
                createdAt
            }
            commentCount
            postid
            loggedUserInfo {
                _id
                userprofile
            }
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation AddComment(
        $userinfo : ID
        $postid : ID
        $content : String
        $parentreplyinfo : ID
    ){
        addComment(input : {
            userinfo : $userinfo
            postid : $postid
            content : $content
            parentreplyinfo : $parentreplyinfo
        })
        {
            commentList {
                _id
                userinfo {
                    _id
                    username
                    userprofile
                }
                parentreplyinfo {
                    _id
                    userinfo {
                        _id
                        username
                        userprofile
                    }
                    content
                }
                content
                createdAt
            }
            commentCount
            postid
            loggedUserInfo {
                _id
                userprofile
            }
        }
    }
`




// comment queries end
