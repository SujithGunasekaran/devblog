import { useEffect, useState, useCallback } from 'react';
import withApollo from '../../hoc/withApollo';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
    useGetUserInfoById,
    useGetUserPostList,
    useDeleteUserCreatedPost,
    useGetVistingUserInfo,
    useGetLoggedUserInfo,
    useGetFollowListInfo,
    useGetFollowingListInfo,
    useAddUserToFollow,
    useRemoveFollowedUser
} from '../../apollo/apolloActions';
import useChangeView from '../../hooks/useChangeView';
import useModelControl from '../../hooks/useModelControl';
import ConfirmModel from '../../components/models/ShowConfirmModel';
import HeadTag from '../../components/HeadTag';
import { prettyUserName } from '../../utils';
import { CancelIcon } from '../../components/icons';
import CircularLoading from '../../components/UI/CircularLoading';

const UserInfoBanner = dynamic(() => import('../../components/user/UserInfoBanner'));
const UserProfileLeftPanel = dynamic(() => import('../../components/panel/leftPanel/UserProfileLeftPanel'));
const UserCreatedPost = dynamic(() => import('../../components/user/UserCreatedPost'));
const UserSavePost = dynamic(() => import('../../components/user/UserSavedPost'));
const UserListWrapper = dynamic(() => import('../../components/user/UserListWrapper'));

const UserPage = () => {

    // state
    const [postActionInfo, setPostActionInfo] = useState({});
    const [showSuccess, setShowSuccess] = useState(null);
    const [loggedUserFollowingList, setLoggedUserFollowingList] = useState(new Set());

    // hooks
    const { currentView, handleChangeView } = useChangeView('publish');
    const { showModel, handleShowModel } = useModelControl(false);

    // routes
    const router = useRouter();
    const { userID } = router.query;

    // querys and mutations
    const { data: userInfo, loading: userInfoLoading, error: userInfoError } = useGetUserInfoById(userID);
    const { data: visitingUserInfo, error: visitingUserInfoError } = useGetVistingUserInfo(userID);
    const { data: loggedUserInfo, error: loggedUserInfoError } = useGetLoggedUserInfo();
    const [getUserFollowListInfo, { data: followListInfo, loading: followListLoading, error: followListError }] = useGetFollowListInfo(userID);
    const [getUserFollowingListInfo, { data: followingListInfo, loading: followingListLoading, error: followingListError }] = useGetFollowingListInfo(userID);
    const [getUserPostList, { data: userPost, loading: userPostLoading, error: userPostError }] = useGetUserPostList(userID);
    const [deleteCreatePost, { error: createdPostDeleteError }] = useDeleteUserCreatedPost();
    const [addUserToFollowList, { loading: followUserLoading, error: followUserError }] = useAddUserToFollow();
    const [removeUserFromFollow, { loading: removeUserLoading, error: removeUserError }] = useRemoveFollowedUser();

    // to get user post list 
    useEffect(() => {
        invokeUserPostList();
    }, [])

    useEffect(() => {
        if (loggedUserInfo && loggedUserInfo.getLoggedUserFollowFollwingList && loggedUserFollowingList.size === 0) {
            setLoggedUserFollowingList(new Set(loggedUserInfo.getLoggedUserFollowFollwingList.userFollowingArray));
        }
    }, [loggedUserInfo])

    const invokeUserPostList = () => {
        try {
            getUserPostList();
        }
        catch (err) {
            console.log(err);
        }
    }

    const resetPostActionInfo = () => {
        setPostActionInfo(prevPostActionInfo => {
            let postActionInfo = JSON.parse(JSON.stringify(prevPostActionInfo));
            postActionInfo = {};
            return postActionInfo
        })
    }

    // open confirm model
    const showConfirmModel = (postid, userid) => {
        setPostActionInfo(prevPostActionInfo => {
            let postActionInfo = JSON.parse(JSON.stringify(prevPostActionInfo));
            postActionInfo = {
                postid, userid
            }
            return postActionInfo
        })
        handleShowModel(true);
    }

    // hide confirm model
    const hideConfirmModel = () => {
        resetPostActionInfo();
        handleShowModel(false);
    }

    // function delete user created post
    const handleDeletePost = async () => {
        const { userid = "", postid = "" } = postActionInfo;
        try {
            const { data } = await deleteCreatePost({ variables: { postid, userid } });
            setShowSuccess(data?.deleteUserPosts?.message ?? '');
            window.scrollTo({ top, behavior: 'smooth' });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            resetPostActionInfo();
            handleShowModel(false);
        }
    }

    // function edit user created post
    const handleEditPost = (postid) => {
        router.push({
            pathname: '/post/[postID]/editpost',
            query: { postID: postid }
        });
    }

    // function used to follow the user
    const handleFollowUser = async (loggedUser, followUser) => {
        try {
            const data = await addUserToFollowList({ variables: { loggedUser, followUser, postId: '' } });
            if (data && data.data && data.data.addUserFollow) {
                setLoggedUserFollowingList(prevInfo => {
                    let loggedUserFollowingList = prevInfo;
                    loggedUserFollowingList = new Set(data.data.addUserFollow.loggedUserFollowingArray);
                    return loggedUserFollowingList;
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // function used to remove user from follow list
    const handleRemoveFollowedUser = async (loggedUser, followUser) => {
        try {
            const data = await removeUserFromFollow({ variables: { loggedUser, followUser, postId: '' } });
            if (data && data.data && data.data.removeUserFollow) {
                setLoggedUserFollowingList(prevInfo => {
                    let loggedUserFollowingList = prevInfo;
                    loggedUserFollowingList = new Set(data.data.removeUserFollow.loggedUserFollowingArray);
                    return loggedUserFollowingList
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // function used to get user follow list info
    const getUserFollowList = () => {
        try {
            getUserFollowListInfo();
        }
        catch (err) {
            console.log(err);
        }
    }

    // function used to get user following list info
    const getUserFollowingList = () => {
        try {
            getUserFollowingListInfo();
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleLeftPanelView = (viewName) => {
        handleChangeView(viewName);
        switch (viewName) {
            case 'follower':
                getUserFollowList();
                break;
            case 'following':
                getUserFollowingList();
                break;
            default: ''
        };
    }

    const handleFollowUserFromList = useCallback(async (loggedUserId, followUserid) => {
        try {
            const data = await addUserToFollowList({ variables: { loggedUser: loggedUserId, followUser: followUserid, postid: '' } });
            if (data && data.data && data.data.addUserFollow) {
                setLoggedUserFollowingList(prevInfo => {
                    let loggedUserFollowingList = prevInfo;
                    loggedUserFollowingList = new Set(data.data.addUserFollow.loggedUserFollowingArray);
                    return loggedUserFollowingList;
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [loggedUserFollowingList])

    const handleUnFollowUserFromList = useCallback(async (loggedUserId, followUserId) => {
        try {
            const data = await removeUserFromFollow({ variables: { loggedUser: loggedUserId, followUser: followUserId, postid: '' } });
            if (data && data.data && data.data.removeUserFollow) {
                setLoggedUserFollowingList(prevInfo => {
                    let loggedUserFollowingList = prevInfo;
                    loggedUserFollowingList = new Set(data.data.removeUserFollow.loggedUserFollowingArray);
                    return loggedUserFollowingList
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [loggedUserFollowingList])

    return (
        <div>
            {
                userInfo && userInfo.getUserById &&
                <HeadTag
                    title={prettyUserName(userInfo.getUserById.userData.username)}
                    description={"devBlog user"}
                />
            }
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="user_top_banner">
                            <img src={userInfo?.getUserById?.userData?.userprofile ?? ''} loading="lazy" alt={userInfo?.getUserById?.userData?.userprofile} className="user_top_info_profile" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="user_top_info_container">
                            {
                                userInfo && userInfo.getUserById &&
                                <UserInfoBanner
                                    userInfo={userInfo.getUserById}
                                    userFollowInfo={visitingUserInfo?.getUserFollowFollowing ?? ''}
                                    handleFollowUser={handleFollowUser}
                                    handleRemoveFollowedUser={handleRemoveFollowedUser}
                                    removeUserLoading={removeUserLoading}
                                    followUserLoading={followUserLoading}
                                />
                            }
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="user_left_info_container">
                                    {
                                        userInfo && userInfo.getUserById &&
                                        <UserProfileLeftPanel
                                            currentView={currentView}
                                            handleChangeView={handleLeftPanelView}
                                            userInfo={userInfo.getUserById}
                                            userFollowInfo={visitingUserInfo?.getUserFollowFollowing ?? ''}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="col-md-9">
                                {
                                    showSuccess &&
                                    <div className="success_alert user_middle_post_success">
                                        {showSuccess}
                                        <CancelIcon cssClass="alert_cancel" handleEvent={() => setShowSuccess(null)} />
                                    </div>
                                }
                                <div className="user_middle_post_list_container">
                                    {
                                        (userInfoLoading || userPostLoading ||
                                            followListLoading || followingListLoading
                                        ) &&
                                        <CircularLoading />
                                    }
                                    {
                                        currentView === 'publish' &&
                                        userPost && userPost.getUserPosts &&
                                        <UserCreatedPost
                                            handleDeletePost={showConfirmModel}
                                            handleEditPost={handleEditPost}
                                            posts={userPost.getUserPosts}
                                            emptyMessage={'You have not created any post'}
                                        />
                                    }
                                    {
                                        currentView === 'save' &&
                                        userInfo && userInfo.getUserById &&
                                        <UserSavePost
                                            handleDeletePost={showConfirmModel}
                                            handleEditPost={handleEditPost}
                                            userInfo={userInfo.getUserById}
                                            emptyMessage={'You have not saved any post'}
                                        />
                                    }
                                    {
                                        currentView === 'follower' &&
                                        followListInfo && followListInfo.getUserFollowListInfo &&
                                        <UserListWrapper
                                            currentView={currentView}
                                            loggedUserID={loggedUserInfo?.getLoggedUserFollowFollwingList?.userid ?? null}
                                            loggedUserFollowingList={loggedUserFollowingList}
                                            userList={followListInfo.getUserFollowListInfo}
                                            handleFollowUserFromList={handleFollowUserFromList}
                                            handleUnFollowUserFromList={handleUnFollowUserFromList}
                                        />
                                    }
                                    {
                                        currentView === 'following' &&
                                        followingListInfo && followingListInfo.getUserFollowingListInfo &&
                                        <UserListWrapper
                                            currentView={currentView}
                                            loggedUserID={loggedUserInfo?.getLoggedUserFollowFollwingList?.userid ?? null}
                                            loggedUserFollowingList={loggedUserFollowingList}
                                            userList={followingListInfo.getUserFollowingListInfo}
                                            handleFollowUserFromList={handleFollowUserFromList}
                                            handleUnFollowUserFromList={handleUnFollowUserFromList}
                                        />
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModel &&
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="model_overlay">
                                <ConfirmModel
                                    info="Are you sure you want to Delete the post."
                                    confirmBtnText="Delete Post"
                                    confirm={handleDeletePost}
                                    cancel={hideConfirmModel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {(userInfoError ||
                userPostError ||
                createdPostDeleteError ||
                visitingUserInfoError ||
                loggedUserInfoError ||
                followListError ||
                followingListError ||
                followUserError ||
                removeUserError
            ) && <div></div>}
        </div>
    )

}

export default withApollo(UserPage);

