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
`

export const USER_LOGOUT = gql`
    query Logout {
        logout
    }
`;


// auth queries end


// post queries start


export const GET_POST_LIST = gql`
    query GetPostList {
        getAllPost {
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
`

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
`

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
