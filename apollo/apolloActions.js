import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_USER_INFO,
    GET_USER_INFO_BY_ID,
    GET_USER_POST_LIST,
    USER_LOGOUT,
    GET_POST_LIST,
    SET_POST_LIKE,
    SET_POST_SAVE,
    CREATE_POST,
    GET_POST_BY_ID,
    GET_POST_BY_USER,
    GET_TAG_LIST
} from './apolloQueries';


// auth actions start

export const useGetUserInfo = () => useLazyQuery(GET_USER_INFO);

export const useGetUserInfoById = (userid) => useQuery(GET_USER_INFO_BY_ID, { variables: { userid } });

export const useGetUserPostList = (userid) => useLazyQuery(GET_USER_POST_LIST, { variables: { userid } });

export const useLogout = () => useQuery(USER_LOGOUT);


// auth actions end


// post actions start

export const useGetAllPost = () => useQuery(GET_POST_LIST);

export const useGetTagList = () => useQuery(GET_TAG_LIST);

export const useGetPostById = (postid) => useQuery(GET_POST_BY_ID, { variables: { postid } });

export const useGetPostByUser = (postid) => useQuery(GET_POST_BY_USER, { variables: { postid } });

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
        const postInfo = cache.readQuery({ query: GET_POST_BY_ID, variables: { postid: addLikeToPost.postid } });
        if (postInfo) {
            const { getPostById } = postInfo;
            cache.writeQuery({
                query: GET_POST_BY_ID,
                data: {
                    getPostById: {
                        ...getPostById,
                        postInfo: {
                            ...getPostById.postInfo,
                            userliked: addLikeToPost.userliked
                        }
                    }
                }
            })
        }
    }
});

export const useSetSaveToPost = () => useMutation(SET_POST_SAVE, {
    update(cache, { data: { addSaveToPost } }) {
        const postInfo = cache.readQuery({ query: GET_POST_BY_ID, variables: { postid: addSaveToPost.postid } });
        if (postInfo) {
            const { getPostById } = postInfo;
            cache.writeQuery({
                query: GET_POST_BY_ID,
                data: {
                    getPostById: {
                        ...getPostById,
                        postInfo: {
                            ...getPostById.postInfo,
                            usersaved: addSaveToPost.usersaved
                        }
                    }
                }
            })
        }
    }
})

// post actions end

