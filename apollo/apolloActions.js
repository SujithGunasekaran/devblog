import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_USER_INFO,
    GET_USER_INFO_BY_ID,
    GET_USER_POST_LIST,
    GET_VISITOR_USER_INFO,
    GET_LOGGED_USER_INFO,
    GET_FOLLOW_LIST_INFO,
    GET_FOLLOWING_LIST_INFO,
    FOLLOW_USER,
    REMOVE_FOLLOW_USER,
    DELETE_USER_CREATED_POST,
    USER_LOGOUT,
    GET_POST_LIST,
    SET_POST_LIKE,
    SET_POST_SAVE,
    CREATE_POST,
    EDIT_POST_INFO,
    GET_POST_BY_ID,
    GET_POST_BY_USER,
    GET_TAG_LIST,
    GET_COMMENT_BY_POST_ID,
    ADD_COMMENT
} from './apolloQueries';


// auth actions start

export const useGetUserInfo = () => useLazyQuery(GET_USER_INFO);

export const useGetUserInfoById = (userid) => useQuery(GET_USER_INFO_BY_ID, { variables: { userid }, fetchPolicy: 'network-only' });

export const useGetUserPostList = (userid) => useLazyQuery(GET_USER_POST_LIST, { variables: { userid }, fetchPolicy: 'network-only' });

export const useGetVistingUserInfo = (userid) => useQuery(GET_VISITOR_USER_INFO, { variables: { userid } });

export const useGetLoggedUserInfo = () => useQuery(GET_LOGGED_USER_INFO);

export const useGetFollowListInfo = (userid) => useLazyQuery(GET_FOLLOW_LIST_INFO, { variables: { userid }, fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first' });

export const useGetFollowingListInfo = (userid) => useLazyQuery(GET_FOLLOWING_LIST_INFO, { variables: { userid }, fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first' });

export const useAddUserToFollow = () => useMutation(FOLLOW_USER, {
    update(cache, { data: { addUserFollow } }) {
        const visitorUserInfo = cache.readQuery({
            query: GET_VISITOR_USER_INFO,
            variables: { userid: addUserFollow.visitorUserID }
        });
        const loggedVisitiorInfo = cache.readQuery({
            query: GET_VISITOR_USER_INFO,
            variables: { userid: addUserFollow.loggedUserID }
        });
        const loggedUserInfo = cache.readQuery({
            query: GET_LOGGED_USER_INFO,
        });
        const getFollowListInfo = cache.readQuery({
            query: GET_FOLLOW_LIST_INFO,
            variables: { userid: addUserFollow.visitorUserID }
        });
        const getFollowingListInfo = cache.readQuery({
            query: GET_FOLLOWING_LIST_INFO,
            variables: { userid: addUserFollow.loggedUserID }
        });
        const postInfo = cache.readQuery({
            query: GET_POST_BY_ID,
            variables: { postid: addUserFollow.postId }
        });
        if (visitorUserInfo) {
            try {
                const userInfo = JSON.parse(JSON.stringify(visitorUserInfo));
                cache.writeQuery({
                    query: GET_VISITOR_USER_INFO,
                    variables: { userid: addUserFollow.visitorUserID },
                    data: {
                        getUserFollowFollowing: {
                            ...userInfo.getUserFollowFollowing,
                            userFollowArray: [
                                ...userInfo.getUserFollowFollowing.userFollowArray,
                                ...addUserFollow.visitorFollowArray
                            ],
                            isLoggedInUserFollowing: addUserFollow.isLoggedInUserFollowing
                        }
                    }
                })
            }
            catch { }
        }
        if (loggedUserInfo) {
            try {
                const userInfo = JSON.parse(JSON.stringify(loggedUserInfo));
                cache.writeQuery({
                    query: GET_LOGGED_USER_INFO,
                    data: {
                        getLoggedUserFollowFollwingList: {
                            ...userInfo.getLoggedUserFollowFollwingList,
                            userFollowingArray: [
                                ...userInfo.getLoggedUserFollowFollwingList.userFollowingArray,
                                ...addUserFollow.loggedUserFollowingArray
                            ]
                        }
                    }
                })
            }
            catch (err) { }
        }
        if (loggedVisitiorInfo) {
            try {
                const userInfo = JSON.parse(JSON.stringify(loggedVisitiorInfo));
                cache.writeQuery({
                    query: GET_VISITOR_USER_INFO,
                    variables: { userid: addUserFollow.loggedUserID },
                    data: {
                        getUserFollowFollowing: {
                            ...userInfo.getUserFollowFollowing,
                            userFollowingArray: [
                                ...userInfo.getUserFollowFollowing.userFollowingArray,
                                ...addUserFollow.loggedUserFollowingArray
                            ]
                        }
                    }
                })
            }
            catch { }
        }
        if (getFollowListInfo) {
            try {
                const userInfo = JSON.parse(JSON.stringify(getFollowListInfo));
                cache.writeQuery({
                    query: GET_FOLLOW_LIST_INFO,
                    variables: { userid: addUserFollow.visitorUserID },
                    data: {
                        getUserFollowListInfo: {
                            ...userInfo.getUserFollowListInfo,
                            userData: {
                                ...userInfo.getUserFollowListInfo.userData,
                                follower: [
                                    ...userInfo.getUserFollowListInfo.userData.follower,
                                    ...addUserFollow.visitorFollowInfo
                                ]
                            }
                        }
                    }
                })
            }
            catch (err) {

            }
        }
        if (getFollowingListInfo) {
            try {
                const userInfo = JSON.parse(JSON.stringify(getFollowingListInfo));
                cache.writeQuery({
                    query: GET_FOLLOWING_LIST_INFO,
                    variables: { userid: addUserFollow.loggedUserID },
                    data: {
                        getUserFollowingListInfo: {
                            ...userInfo.getUserFollowingListInfo,
                            userData: {
                                ...userInfo.getUserFollowingListInfo.userData,
                                following: [
                                    ...userInfo.getUserFollowingListInfo.userData.following,
                                    ...addUserFollow.loggedFollowingInfo
                                ]
                            }
                        }
                    }
                })
            }
            catch (err) { }
        }
        if (postInfo && addUserFollow.postId) {
            try {
                const postData = JSON.parse(JSON.stringify(postInfo));
                cache.writeQuery({
                    query: GET_POST_BY_ID,
                    variables: { postid: addUserFollow.postId },
                    data: {
                        getPostById: {
                            ...postData.getPostById,
                            isLoggedInUserFollowing: addUserFollow.isLoggedInUserFollowing
                        }
                    }
                })
            }
            catch (err) { }
        }
    }
})

export const useRemoveFollowedUser = () => useMutation(REMOVE_FOLLOW_USER, {
    update(cache, { data: { removeUserFollow } }) {
        const visitorUserInfo = cache.readQuery({
            query: GET_VISITOR_USER_INFO,
            variables: { userid: removeUserFollow.visitorUserID }
        });
        const loggedUserInfo = cache.readQuery({
            query: GET_LOGGED_USER_INFO,
        });
        const loggedVisitiorInfo = cache.readQuery({
            query: GET_VISITOR_USER_INFO,
            variables: { userid: removeUserFollow.loggedUserID }
        });
        const postInfo = cache.readQuery({
            query: GET_POST_BY_ID,
            variables: { postid: removeUserFollow.postId }
        });
        if (visitorUserInfo) {
            try {
                const userInfo = JSON.parse(JSON.stringify(visitorUserInfo));
                cache.writeQuery({
                    query: GET_VISITOR_USER_INFO,
                    variables: { userid: removeUserFollow.visitorUserID },
                    data: {
                        getUserFollowFollowing: {
                            ...userInfo.getUserFollowFollowing,
                            userFollowArray: removeUserFollow.visitorFollowArray,
                            isLoggedInUserFollowing: removeUserFollow.isLoggedInUserFollowing
                        }
                    }
                })
            }
            catch { }
        }
        if (loggedUserInfo) {
            try {
                const userInfo = JSON.parse(JSON.stringify(loggedUserInfo));
                cache.writeQuery({
                    query: GET_LOGGED_USER_INFO,
                    data: {
                        getLoggedUserFollowFollwingList: {
                            ...userInfo.getLoggedUserFollowFollwingList,
                            userFollowingArray: removeUserFollow.loggedUserFollowingArray
                        }
                    }
                })
            }
            catch (err) { }
        }
        if (loggedVisitiorInfo) {
            try {
                const userInfo = JSON.parse(JSON.stringify(loggedVisitiorInfo));
                cache.writeQuery({
                    query: GET_VISITOR_USER_INFO,
                    variables: { userid: removeUserFollow.loggedUserID },
                    data: {
                        getUserFollowFollowing: {
                            ...userInfo.getUserFollowFollowing,
                            userFollowingArray: removeUserFollow.loggedUserFollowingArray,
                        }
                    }
                })
            }
            catch { }
        }
        if (postInfo && removeUserFollow.postId) {
            try {
                const postData = JSON.parse(JSON.stringify(postInfo));
                cache.writeQuery({
                    query: GET_POST_BY_ID,
                    variables: { postid: removeUserFollow.postId },
                    data: {
                        getPostById: {
                            ...postData.getPostById,
                            isLoggedInUserFollowing: removeUserFollow.isLoggedInUserFollowing
                        }
                    }
                })
            }
            catch (err) { }
        }
    }
})

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

export const useGetAllPost = () => useLazyQuery(GET_POST_LIST, { fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-first' });

export const useGetTagList = () => useQuery(GET_TAG_LIST);

export const useGetPostById = (postid) => useQuery(GET_POST_BY_ID, { variables: { postid }, fetchPolicy: 'cache-and-network' });

export const useGetPostByUser = (postid) => useQuery(GET_POST_BY_USER, { variables: { postid } });

export const useCreatePost = () => useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
        // const postListData = cache.readQuery({
        //     query: GET_POST_LIST,
        //     variables: { startDate: '' }
        // });
        // if (postListData) {
        //     try {
        //         const { getAllPost } = postListData;
        //         cache.writeQuery({
        //             query: GET_POST_LIST,
        //             data: {
        //                 getAllPost: {
        //                     ...getAllPost,
        //                     postList: [
        //                         ...getAllPost.postList,
        //                         createPost
        //                     ]
        //                 }
        //             },
        //             variables: { startDate: '' }
        //         })
        //     }
        //     catch (err) { }
        // }
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



// comment action start


export const useGetCommentByPostId = () => useLazyQuery(GET_COMMENT_BY_POST_ID);

export const useAddComment = () => useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
        const commentList = cache.readQuery({
            query: GET_COMMENT_BY_POST_ID,
            variables: { postid: addComment.postid }
        });
        if (commentList) {
            try {
                const commentListInfo = JSON.parse(JSON.stringify(commentList));
                cache.writeQuery({
                    query: GET_COMMENT_BY_POST_ID,
                    variables: { postid: addComment.postid },
                    data: {
                        getCommentByPostId: {
                            ...commentListInfo.getCommentByPostId,
                            commentList: [
                                ...commentListInfo.getCommentByPostId.commentList,
                                addComment.commentList
                            ],
                            commentCount: addComment.commentCount
                        }
                    }
                })
            }
            catch (err) { }
        }
    }
});


// comment action end

