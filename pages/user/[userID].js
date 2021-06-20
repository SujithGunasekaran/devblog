import { useState, useEffect } from 'react';
import withApollo from '../../hoc/withApollo';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useGetUserInfoById, useGetUserPostList } from '../../apollo/apolloActions';
import useChangeView from '../../hooks/useChangeView';

const UserInfoBanner = dynamic(() => import('../../components/user/UserInfoBanner'));
const UserProfileLeftPanel = dynamic(() => import('../../components/panel/leftPanel/UserProfileLeftPanel'));
const UserCreatedPost = dynamic(() => import('../../components/user/UserCreatedPost'));
const UserSavePost = dynamic(() => import('../../components/user/UserSavedPost'));

const UserPage = () => {

    // hooks
    const { currentView, handleChangeView } = useChangeView('publish');

    const router = useRouter();
    const { userID } = router.query;

    const { data: userInfo, loading: userInfoLoading, error: userInfoError } = useGetUserInfoById(userID);
    const [getUserPostList, { data: userPost, loading: userPostLoading, error: userPostError }] = useGetUserPostList(userID);

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

    return (
        <div>
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
            {(userInfoError || userPostError) && <div></div>}
        </div>
    )

}

export default withApollo(UserPage);

