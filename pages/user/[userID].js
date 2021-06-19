import { useState } from 'react';
import withApollo from '../../hoc/withApollo';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useGetUserInfoById } from '../../apollo/apolloActions';

const UserInfoBanner = dynamic(() => import('../../components/user/UserInfoBanner'));
const UserProfileLeftPanel = dynamic(() => import('../../components/panel/leftPanel/UserProfileLeftPanel'));
const UserCreatedPost = dynamic(() => import('../../components/user/UserCreatedPost'));
const UserSavePost = dynamic(() => import('../../components/user/UserSavedPost'));

const UserPage = () => {

    const [currentView, setCurrentView] = useState('publish');

    const router = useRouter();
    const { userID } = router.query;

    const { data, loading, error } = useGetUserInfoById(userID);

    const handleChangeView = (viewName) => {
        setCurrentView(viewName);
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="user_top_banner">
                            <img src={data?.getUserById?.userData?.userprofile ?? ''} loading="lazy" alt={data?.getUserById?.userData?.userprofile} className="user_top_info_profile" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="user_top_info_container">
                            {
                                data && data.getUserById &&
                                <UserInfoBanner
                                    userData={data.getUserById.userData}
                                />
                            }
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="user_left_info_container">
                                    {
                                        data && data.getUserById &&
                                        <UserProfileLeftPanel
                                            currentView={currentView}
                                            handleChangeView={handleChangeView}
                                            userInfo={data.getUserById}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="col-md-3">
                                {
                                    currentView === 'publish' &&
                                    <UserCreatedPost />
                                }
                                {
                                    currentView === 'save' &&
                                    <UserSavePost />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <div></div>}
        </div>
    )

}

export default withApollo(UserPage);

