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
