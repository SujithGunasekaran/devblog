import { prettyUserName, convertFullDateToLong } from '../../utils';
import { CalenderIcon } from '../icons';

const UserInfoBanner = (props) => {

    const { userData } = props;

    return (
        <div>
            <button className="user_top_info_follow_btn">Follow</button>
            <div className="user_top_info_username">{prettyUserName(userData.username)}</div>
            <div className="user_top_info_description">{userData?.userdescription ?? ''}</div>
            <div className="user_top_info_highlight_container">
                <div className="user_top_info_highlight_info">
                    <CalenderIcon cssClass="user_top_info_highlight_icon" />
                    <div className="user_top_info_highlight_text">Joined on {convertFullDateToLong(userData.joined)}</div>
                </div>
            </div>
        </div>
    )

};

export default UserInfoBanner;
