import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_USER_INFO,
    GET_USER_INFO_BY_ID,
    GET_USER_POST_LIST,
    DELETE_USER_CREATED_POST,
    USER_LOGOUT,
    GET_POST_LIST,
    SET_POST_LIKE,
    SET_POST_SAVE,
    CREATE_POST,
    EDIT_POST_INFO,
    GET_POST_BY_ID,
    GET_POST_BY_USER,
    GET_TAG_LIST
} from './apolloQueries';


// auth actions start

export const useGetUserInfo = () => useLazyQuery(GET_USER_INFO);

export const useGetUserInfoById = (userid) => useQuery(GET_USER_INFO_BY_ID, { variables: { userid }, fetchPolicy: 'network-only' });

export const useGetUserPostList = (userid) => useLazyQuery(GET_USER_POST_LIST, { variables: { userid }, fetchPolicy: 'network-only' });

export const useDeleteUserCreatedPost = () => useMutation(DELETE_USER_CREATED_POST, {
    update(cache, { data: { deleteUserPosts } }) {
        const userInfoById = cache.readQuery({
            query: GET_USER_INFO_BY_ID,
            variables: { userid: deleteUserPosts.loggedUserInfo._id }
        })
        const userPostList = cache.readQuery({
            query: GET_USER_POST_LIST,
            variables: { userid: deleteUserPosts.loggedUserInfo._id }
        });
        const allPost = cache.readQuery({
            query: GET_POST_LIST,
            variables: ''
        });
        if (userInfoById) {
            try {
                const { getUserById } = userInfoById;
                cache.writeQuery({
                    query: GET_USER_INFO_BY_ID,
                    variables: { userid: deleteUserPosts.loggedUserInfo._id },
                    data: {
                        getUserById: {
                            ...getUserById,
                            userData: {
                                ...getUserById.userData,
                                usersavedpost: deleteUserPosts.userData.usersavedpost
                            },
                            postcount: deleteUserPosts.postcount
                        }
                    }
                })
            }
            catch (err) { }
        }
        if (userPostList) {
            try {
                const { getUserPosts } = userPostList;
                cache.writeQuery({
                    query: GET_USER_POST_LIST,
                    variables: { userid: deleteUserPosts.loggedUserInfo._id },
                    data: {
                        getUserPosts: {
                            ...getUserPosts,
                            postInfo: deleteUserPosts.postInfo
                        }
                    }
                })
            }
            catch (err) { }
        }
        if (allPost) {
            try {
                const { getAllPost } = allPost;
                cache.writeQuery({
                    query: GET_POST_LIST,
                    data: {
                        getAllPost: {
                            ...getAllPost,
                            postList: deleteUserPosts.postInfo
                        }
                    },
                    variables: { startDate: '' }
                })
            }
            catch (err) { }
        }
    }
});

export const useLogout = () => useQuery(USER_LOGOUT);


// auth actions end


// post actions start

export const useGetAllPost = (startDate) => useLazyQuery(GET_POST_LIST, { variables: { startDate }, fetchPolicy: 'cache-and-network' });

export const useGetTagList = () => useQuery(GET_TAG_LIST);

export const useGetPostById = (postid) => useQuery(GET_POST_BY_ID, { variables: { postid } });

export const useGetPostByUser = (postid) => useQuery(GET_POST_BY_USER, { variables: { postid } });

export const useCreatePost = () => useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
        const postListData = cache.readQuery({
            query: GET_POST_LIST,
            variables: { startDate: '' }
        });
        if (postListData) {
            try {
                const { getAllPost } = postListData;
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
                    },
                    variables: { startDate: '' }
                })
            }
            catch (err) { }
        }
    }
});

export const useEditPostInfo = () => useMutation(EDIT_POST_INFO);

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

