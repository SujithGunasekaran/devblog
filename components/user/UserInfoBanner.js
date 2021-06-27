import { prettyUserName, convertFullDateToLong } from '../../utils';
import { CalenderIcon } from '../icons';

const UserInfoBanner = (props) => {

    const { userInfo, userFollowInfo } = props;

    return (
        <div>
            {
                (userFollowInfo && userInfo) && userFollowInfo.userData.userid !== userInfo.loggedUserInfo._id ?
                    (
                        userFollowInfo.isLoggedInUserFollowing ?
                            <button className="user_top_info_follow_btn">unFollow</button> :
                            <button className="user_top_info_follow_btn">Follow</button>
                    ) : <div style={{ padding: '20px 13px' }}></div>
            }
            <div className="user_top_info_username">{prettyUserName(userInfo?.userData?.username ?? '')}</div>
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
