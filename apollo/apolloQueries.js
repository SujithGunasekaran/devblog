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
              title
              tags
              user {
                username
                userprofile
              }
              _id
            }
        }
    }
`


// post queries end
