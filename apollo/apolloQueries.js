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

export const USER_LOGOUT = gql`
    query Logout {
        logout
    }
`


// auth queries end


// post queries start


export const GET_POST_LIST = gql`
    query GetPostList {
        getAllPost {
            postList {
                _id
                title
                like
                tags
                createdAt
                user {
                  username
                  userprofile
                }
            }
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
                like
                createdAt
                user {
                    username
                    userprofile
                }
            }
            isUserLikedThePost
        }
    }
`;

export const GET_USER_LIKED_POST = gql`
    query GetUserLikedPost {
        userLikedPost {
            userLikedPostList {
                postid
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost(
        $title : String!
        $content : String!
        $tags : String
        $like : Int
    ){
        createPost(input : {
            title : $title
            content : $content
            tags : $tags
            like : $like
        })
        {
            _id
            title
            like
            tags
            createdAt
            user {
                username
                userprofile
            }
        }
    }
`

export const SET_POST_LIKE = gql`
    mutation AddLikeToPost(
        $likecount : Int
        $postid : ID
        $type : String
    ){
        addLikeToPost(input : {
            likecount : $likecount
            postid : $postid
            type : $type
        }) 
        {
            postList {
                _id
                title
                like
                tags
                createdAt
                user {
                  username
                  userprofile
                }
            }
            userLikedPostList {
                postid
            }
        }
    }
`;


// post queries end
