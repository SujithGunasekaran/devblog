import { convertFullDateToLong, prettyUserName } from '../../../utils';
import UserPostList from '../../post/UserPostList';
import PageLink from '../../PageLink';

const PostRightPanel = (props) => {

    const { userInfo, postid } = props;

    return (
        <div>
            <div className="post_id_right_user_card_container">
                <div className="post_id_right_user_card_header"></div>
                <div className="post_id_right_user_card_subhead_container">
                    <div className="post_id_right_user_card_info">
                        <img src={userInfo.userprofile} loading="lazy" className="post_id_right_user_card_profile" />
                        <PageLink href="/user/[userID]" as={`/user/${userInfo._id}`}>
                            <div className="post_id_right_user_card_name">{prettyUserName(userInfo.username)}</div>
                        </PageLink>
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
                    userid={userInfo?._id ?? ''}
                    userName={userInfo?.username ?? ''}
                />
            </div>
        </div>

    )

}

export default PostRightPanel;
