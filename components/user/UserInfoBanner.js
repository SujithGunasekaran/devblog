import { prettyUserName, convertFullDateToLong } from '../../utils';
import { CalenderIcon, EditSquareIcon } from '../icons';

const UserInfoBanner = (props) => {

    const { userInfo, userFollowInfo, followUserLoading, removeUserLoading, handleRemoveFollowedUser, handleFollowUser, handleShowEditModel } = props;

    return (
        <div>
            {
                (userFollowInfo && userInfo.loggedUserInfo) && userFollowInfo.userid !== userInfo.loggedUserInfo._id ?
                    (
                        userFollowInfo.isLoggedInUserFollowing ?
                            <button disabled={removeUserLoading} className="user_top_info_follow_btn" onClick={() => handleRemoveFollowedUser(userInfo.loggedUserInfo._id, userFollowInfo.userid)}>{removeUserLoading ? 'UnFollowing...' : 'UnFollow'}</button> :
                            <button disabled={followUserLoading} className="user_top_info_follow_btn" onClick={() => handleFollowUser(userInfo.loggedUserInfo._id, userFollowInfo.userid)}>{followUserLoading ? 'Following...' : 'Follow'}</button>
                    ) : <div style={{ padding: '20px 13px' }}></div>
            }
            <div className="user_top_info_userinfo_container">
                <div className="user_top_info_username">{prettyUserName(userInfo?.userData?.username ?? '')}</div>
                {
                    (userFollowInfo && userInfo.loggedUserInfo) && userFollowInfo.userid === userInfo.loggedUserInfo._id &&
                    <div onClick={() => handleShowEditModel(true)}>
                        <EditSquareIcon cssClass="user_top_info_username_edit_icon" />
                    </div>
                }
            </div>
            <div className="user_top_info_description">{userInfo?.userData?.userdescription ?? ''}</div>
            <div className="user_top_info_highlight_container">
                <div className="user_top_info_highlight_info">
                    <CalenderIcon cssClass="user_top_info_highlight_icon" />
                    <div className="user_top_info_highlight_text">Joined on {convertFullDateToLong(userInfo?.userData?.joined ?? '')}</div>
                </div>
            </div>
        </div>
    )

};

export default UserInfoBanner;
