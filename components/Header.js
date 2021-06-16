import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import withApollo from '../hoc/withApollo';
import PageLink from '../components/PageLink';
import { useGetUserInfo } from '../apollo/apolloActions';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LogoutModel = dynamic(() => import('../components/models/ShowLogoutConfirm'));

const Header = () => {

    // state
    const [showLogoutModel, setShowLogoutModel] = useState(false);

    const profileDropdown = useRef();
    const router = useRouter();

    const [getUserInfo, { data: user, error }] = useGetUserInfo();

    useEffect(() => {
        getUserInfo()
    }, [])

    const showProfileDropDown = () => {
        profileDropdown.current.classList.toggle('show');
    }

    const logoutUser = () => {
        profileDropdown.current.classList.remove('show');
        setShowLogoutModel(true);
    }

    const confirmLogout = () => {
        setShowLogoutModel(false);
        router.push('/logout');
    }

    const cancelLogout = () => {
        setShowLogoutModel(false);
    }

    return (
        <div>
            <div className="header_main">
                <div className="header_container">
                    <PageLink href={'/'} as={'/'}>
                        <a className="header_logo">devBlog</a>
                    </PageLink>
                    {
                        // (user && user.getUserInfo) &&
                        <div className="header_info_list_container">
                            <PageLink href={'/post/createpost'} as={'/post/createpost'}>
                                <a className="header_info_list_name">Create Post</a>
                            </PageLink>
                        </div>
                    }
                    {
                        (!user || (user && !user.getUserInfo)) &&
                        <div className="header_auth_container">
                            <PageLink href={'/login'} as={'/login'}>
                                <a className="header_auth_signin">Login</a>
                            </PageLink>
                        </div>
                    }
                    {
                        (user && user.getUserInfo) &&
                        <>
                            <div className="header_auth_user">
                                <div className="header_auth_user_info">Welcome, {`${user.getUserInfo.username[0].toUpperCase()}${user.getUserInfo.username.slice(1).toLowerCase()}`}</div>
                                {
                                    user.getUserInfo.userprofile &&
                                    <img src={`${user.getUserInfo.userprofile}`} onClick={() => showProfileDropDown()} className="header_auth_user_profile" width={35} height={35} />
                                }
                            </div>
                            <div className="header_profile_dropdown" ref={profileDropdown}>
                                <div className="header_profile_triangle"></div>
                                <div className="header_profile_list_display">
                                    <PersonIcon className="header_profile_list_icon" />
                                    <div className="header_profile_list_name">Profile</div>
                                </div>
                                <div className="header_profile_list_display" onClick={() => logoutUser()}>
                                    <ExitToAppIcon className="header_profile_list_icon" />
                                    <div className="header_profile_list_name">Logout</div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            {
                showLogoutModel &&
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="model_overlay">
                                <LogoutModel
                                    confirmLogout={confirmLogout}
                                    cancelLogout={cancelLogout}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                error && <div></div>
            }
        </div>
    )

}

export default withApollo(Header);
