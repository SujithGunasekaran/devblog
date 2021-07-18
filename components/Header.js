import { useEffect, useRef, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import withApollo from '../hoc/withApollo';
import PageLink from '../components/PageLink';
import { useGetUserInfo, useSearchPost } from '../apollo/apolloActions';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useModelControl from '../hooks/useModelControl';
import { HamburgerIcon, CloseIcon } from './icons';
import { SearchIcon } from './icons';

const LogoutModel = dynamic(() => import('./models/ShowConfirmModel'));

const Header = () => {

    // state
    const [searchInput, setSearchInput] = useState(null);
    const [searchResult, setSearchResult] = useState([]);

    // hooks
    const { showModel, handleShowModel } = useModelControl(false);

    //refs
    const profileDropdown = useRef();
    const authDropdown = useRef();
    const mobileModel = useRef();
    const mobileModelOverlay = useRef();

    const router = useRouter();

    const [getUserInfo, { data: user, error }] = useGetUserInfo();
    const [getPostBySearchText, { loading, error: searchError }] = useSearchPost();

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {

        const searchPost = async () => {
            try {
                const { data } = await getPostBySearchText({ variables: { text: searchInput ? searchInput : '' } });
                if (data && data.postSearch.postResult.length > 0) {
                    setSearchResult(data.postSearch.postResult);
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        const timerID = setTimeout(() => {
            if (searchInput) {
                searchPost();
            } else {
                setSearchResult([]);
            }
        }, 700)

        return () => {
            clearTimeout(timerID);
        };

    }, [searchInput])

    useEffect(() => {

        function closeDropdown(e) {
            if (authDropdown.current && !authDropdown.current.contains(e.target)) {
                profileDropdown.current.classList.remove('show');
            }
            if (authDropdown.current && authDropdown.current.contains(e.target)) {
                profileDropdown.current && profileDropdown.current.classList.add('show');
            }
        }
        document.body.addEventListener('click', closeDropdown);

        const hamburger = document.querySelector('#hamburger');
        const closeHamburger = document.querySelector('#closeHamburger')
        const headerOverlay = document.querySelector('#header-model-overlay');

        const removeHeaderModel = () => {
            hamburger.style.display = 'block';
            closeHamburger.style.display = 'none';
            mobileModel.current.classList.remove('active');
            mobileModelOverlay.current.classList.add('hidden');
        }

        const addHeaderModel = () => {
            hamburger.style.display = 'none';
            closeHamburger.style.display = 'block';
            mobileModel.current.classList.add('active');
            mobileModelOverlay.current.classList.remove('hidden');
        }

        if (headerOverlay) headerOverlay.addEventListener('click', removeHeaderModel);
        if (closeHamburger) closeHamburger.addEventListener('click', removeHeaderModel);
        if (hamburger) hamburger.addEventListener('click', addHeaderModel);


        return () => {
            document.body.removeEventListener('click', closeDropdown)
        }

    }, [])

    const showProfileDropDown = () => {
        profileDropdown.current.classList.toggle('show');
    }

    const redirectToProfilePage = () => {
        profileDropdown.current.classList.remove('show');
        router.push({
            pathname: '/user/[userID]',
            query: { userID: user.getUserInfo._id }
        })
    }

    const logoutUser = () => {
        profileDropdown.current.classList.remove('show');
        handleShowModel(true);
    }

    const confirmLogout = () => {
        handleShowModel(false);
        router.push('/logout');
    }

    const cancelLogout = () => {
        handleShowModel(false);
    }

    const mobileHeaderModel = () => (
        <Fragment>
            <div className="header_mobile_model_overlay hidden" id="header-model-overlay" ref={mobileModelOverlay}>
                <div className="header_mobile_model_container" ref={mobileModel}>
                    <div className="header_mobile_model_info_container">
                        <PageLink href={'/post/createpost'} as={'/post/createpost'}>
                            <a className="header_mobile_model_info_letter">Create Post</a>
                        </PageLink>
                    </div>
                </div>
            </div>
        </Fragment>
    );


    const searchFiled = () => (
        <Fragment>
            <div className="header_search_input_container">
                <SearchIcon cssClass="header_search_input_icon" />
                <input
                    className="header_search_input_field"
                    value={searchInput || ''}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            {
                searchResult.length > 0 &&
                <div className="header_search_result_container">
                    {
                        searchResult.map((postInfo, index) => (
                            <Fragment key={index}>
                                <PageLink href={'/post/[postID]'} as={`/post/${postInfo._id}`}>
                                    <a>
                                        <div className="header_search_result_post_container">
                                            <div className="header_search_result_post_name">{postInfo.title}</div>
                                        </div>
                                    </a>
                                </PageLink>
                            </Fragment>
                        ))
                    }
                </div>
            }
        </Fragment>
    )


    return (
        <div>
            {mobileHeaderModel()}
            <div className="header_main">
                <div className="header_container">
                    <div id="hamburger">
                        <HamburgerIcon cssClass="header_hamburger_icon" />
                    </div>
                    <div style={{ display: 'none' }} id="closeHamburger">
                        <CloseIcon cssClass="header_hamburger_close_icon" />
                    </div>
                    <PageLink href={'/'} as={'/'}>
                        <a className="header_logo">devBlog</a>
                    </PageLink>
                    {
                        (user && user.getUserInfo) &&
                        <div className="header_info_list_container">
                            <PageLink href={'/post/createpost'} as={'/post/createpost'}>
                                <a className="header_info_list_name">Create Post</a>
                            </PageLink>
                        </div>
                    }
                    <div className="header_search_container">
                        {searchFiled()}
                    </div>
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
                            <div className="header_auth_user" ref={authDropdown}>
                                <div className="header_auth_user_info">Welcome, {`${user.getUserInfo.username[0].toUpperCase()}${user.getUserInfo.username.slice(1).toLowerCase()}`}</div>
                                {
                                    user.getUserInfo.userprofile &&
                                    <img src={`${user.getUserInfo.userprofile}`} onClick={() => showProfileDropDown()} className="header_auth_user_profile" width={35} height={35} />
                                }
                            </div>
                            <div className="header_profile_dropdown" ref={profileDropdown}>
                                <div className="header_profile_triangle"></div>
                                <div className="header_profile_list_display" onClick={() => redirectToProfilePage()}>
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
                showModel &&
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="model_overlay">
                                <LogoutModel
                                    info="Are you sure you want Logout ?"
                                    confirmBtnText="Logout"
                                    confirm={confirmLogout}
                                    cancel={cancelLogout}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                (error || searchError) && <div></div>
            }
        </div>
    )

}

export default withApollo(Header);
