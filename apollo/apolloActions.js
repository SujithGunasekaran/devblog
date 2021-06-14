import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_USER_INFO,
    USER_LOGOUT,
    GET_POST_LIST,
    SET_POST_LIKE,
    CREATE_POST,
    GET_POST_BY_ID
} from './apolloQueries';


// auth actions start

export const useGetUserInfo = () => useLazyQuery(GET_USER_INFO);

export const useLogout = () => useQuery(USER_LOGOUT);


// auth actions end


// post actions start

export const useGetAllPost = () => useQuery(GET_POST_LIST);

export const useGetPostById = (postid) => useQuery(GET_POST_BY_ID, { variables: { postid } })

export const useCreatePost = () => useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
        const postListData = cache.readQuery({
            query: GET_POST_LIST
        });
        if (postListData) {
            try {
                const { getAllPost } = postListData;
                debugger
                cache.writeQuery({
                    query: GET_POST_LIST,
                    data: {
                        getAllPost: {
                            ...getAllPost,
                            postList: [
                                ...getAllPost.postList,
                                createPost
                            ]
                        }
                    }
                })
            }
            catch (err) { }
        }
    }
});

export const useSetLikeToPost = () => useMutation(SET_POST_LIKE, {
    update(cache, { data: { addLikeToPost } }) {
        const userLikedData = cache.readQuery({
            query: GET_USER_LIKED_POST
        });
        if (userLikedData) {
            try {
                const { userLikedPost } = userLikedData;
                cache.writeQuery({
                    query: GET_USER_LIKED_POST,
                    data: { userLikedPost: { ...userLikedPost, userLikedPostList: addLikeToPost.userLikedPostList } }
                })
            }
            catch (err) { }
        }
    }
});

// post actions end

