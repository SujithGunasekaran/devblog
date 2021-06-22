import { useEffect, useState } from 'react';
import withApollo from '../../hoc/withApollo';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useGetUserInfoById, useGetUserPostList, useDeleteUserCreatedPost } from '../../apollo/apolloActions';
import useChangeView from '../../hooks/useChangeView';
import useModelControl from '../../hooks/useModelControl';
import ConfirmModel from '../../components/models/ShowConfirmModel';
import HeadTag from '../../components/HeadTag';
import { prettyUserName } from '../../utils';

const UserInfoBanner = dynamic(() => import('../../components/user/UserInfoBanner'));
const UserProfileLeftPanel = dynamic(() => import('../../components/panel/leftPanel/UserProfileLeftPanel'));
const UserCreatedPost = dynamic(() => import('../../components/user/UserCreatedPost'));
const UserSavePost = dynamic(() => import('../../components/user/UserSavedPost'));

const UserPage = () => {

    // state
    const [postActionInfo, setPostActionInfo] = useState({});

    // hooks
    const { currentView, handleChangeView } = useChangeView('publish');
    const { showModel, handleShowModel } = useModelControl(false);

    // routes
    const router = useRouter();
    const { userID } = router.query;

    // querys and mutations
    const { data: userInfo, loading: userInfoLoading, error: userInfoError } = useGetUserInfoById(userID);
    const [getUserPostList, { data: userPost, loading: userPostLoading, error: userPostError }] = useGetUserPostList(userID);
    const [deleteCreatePost, { error: createdPostDeleteError }] = useDeleteUserCreatedPost();


    // to get user post list 
    useEffect(() => {
        invokeUserPostList()
    }, [])

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
    const handleCreatePostDelete = async () => {
        const { userid = "", postid = "" } = postActionInfo;
        try {
            await deleteCreatePost({ variables: { postid, userid } });
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
    const handleCreatePostEdit = (postid, userid) => {
        console.log("edit", postid, userid);
    }

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
                                    userData={userInfo.getUserById.userData}
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
                                            handleChangeView={handleChangeView}
                                            userInfo={userInfo.getUserById}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="col-md-9">
                                {
                                    currentView === 'publish' &&
                                    userPost && userPost.getUserPosts &&
                                    <div className="user_middle_post_list_container">
                                        <UserCreatedPost
                                            handleCreatePostDelete={showConfirmModel}
                                            handleCreatePostEdit={showConfirmModel}
                                            posts={userPost.getUserPosts}
                                        />
                                    </div>
                                }
                                {
                                    currentView === 'save' &&
                                    userInfo && userInfo.getUserById &&
                                    <div className="user_middle_post_list_container">
                                        <UserSavePost
                                            userInfo={userInfo.getUserById}
                                        />
                                    </div>
                                }
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
                                    confirm={handleCreatePostDelete}
                                    cancel={hideConfirmModel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {(userInfoError || userPostError || createdPostDeleteError) && <div></div>}
        </div>
    )

}

export default withApollo(UserPage);

