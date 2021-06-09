import { useQuery, useLazyQuery } from '@apollo/client';
import {
    GET_USER_INFO,
    USER_LOGOUT,
    GET_POST_LIST
} from './apolloQueries';


// auth actions start

export const useGetUserInfo = () => useLazyQuery(GET_USER_INFO);

export const useLogout = () => useQuery(USER_LOGOUT);


// auth actions end


// post actions start

export const useGetAllPost = () => useQuery(GET_POST_LIST);

// post actions end

