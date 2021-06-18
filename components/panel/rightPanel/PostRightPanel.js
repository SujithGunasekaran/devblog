import { convertFullDateToLong } from '../../../utils';
import UserPostList from '../../post/UserPostList';

const PostRightPanel = (props) => {

    const { userInfo, postid } = props;

    return (
        <div>
            <div className="post_id_right_user_card_container">
                <div className="post_id_right_user_card_header"></div>
                <div className="post_id_right_user_card_subhead_container">
                    <div className="post_id_right_user_card_info">
                        <img src={userInfo.userprofile} loading="lazy" className="post_id_right_user_card_profile" />
                        <div className="post_id_right_user_card_name">{userInfo.username ? `${userInfo.username[0].toUpperCase()}${userInfo.username.slice(1).toLowerCase()}` : ''}</div>
                    </div>
                </div>
                <div className="post_id_right_body_container">
                    <div className="post_id_right_body_content">{userInfo?.userdescription ?? ''}</div>
                    <button className="post_id_right_body_btn">Follow</button>
                    <div className="post_id_right_body_info_container">
                        <div className="post_id_right_body_info_heading">Joined</div>
                        <div className="post_id_right_body_info_content">{convertFullDateToLong(userInfo.joined)}</div>
                    </div>
                </div>
            </div>
            <div className="post_id_right_user_post_container">
                <UserPostList
                    postid={postid}
                    userName={userInfo?.username ?? ''}
                />
            </div>
        </div>

    )

}

export default PostRightPanel;
