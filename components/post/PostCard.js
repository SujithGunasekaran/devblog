import { HeartLightIcon, EditSquareIcon, DeleteIcon, HeartIcon } from '../icons';
import { convertFullDateToShort, prettyUserName } from '../../utils';
import PageLink from '../PageLink';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const PostCard = (props) => {

    const { postInfo, loggedUserInfo, isUserCanEdit = false, handleEdit, handleDelete, postCreatedUser } = props;
    let createdPostDate = convertFullDateToShort(postInfo.createdAt);

    return (
        <div>
            <div className="home_middle_post_container">
                <div className="home_middle_post_user_container">
                    <img src={`${postInfo?.user.userprofile}` ?? ''} alt={postInfo?.user?.username ?? ''} loading="lazy" className="home_middle_post_user_profile" />
                    <div className="home_middle_post_user_info_display">
                        <div className="home_middle_post_user_header_main_container">
                            <div className="home_middle_post_user_subheader">
                                <div className="home_middle_post_user_name">{prettyUserName(postInfo.user.username)}</div>
                                <div className="home_middle_post_date">{createdPostDate ? createdPostDate : ''}</div>
                            </div>
                            <div className="home_middle_post_header_icon_container">
                                {
                                    isUserCanEdit &&
                                    <>
                                        <Tooltip TransitionComponent={Zoom} title={'Edit Post'} arrow>
                                            <div className="home_middle_post_reaction_container">
                                                <div className="home_middle_post_like_bg" onClick={() => handleEdit(postInfo._id, postCreatedUser)}>
                                                    <EditSquareIcon cssClass={"home_middle_post_edit_icon"} />
                                                </div>
                                            </div>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title={'Delete Post'} arrow>
                                            <div className="home_middle_post_reaction_container">
                                                <div className="home_middle_post_like_bg" onClick={() => handleDelete(postInfo._id, postCreatedUser)}>
                                                    <DeleteIcon cssClass={"home_middle_post_delete_icon"} />
                                                </div>
                                            </div>
                                        </Tooltip>
                                    </>
                                }
                            </div>
                        </div>
                        <PageLink href={'/post/[postID]'} as={`/post/${postInfo._id}`}>
                            <a className="home_middle_post_link">
                                <div className="home_middle_post_title">{postInfo?.title ?? ''}</div>
                                <div className="home_middle_post_tag_display">
                                    {
                                        postInfo.tags && postInfo.tags.split(",").map((tagName, index) => (
                                            <div className="home_middle_post_tag" key={index}><span className="light_text"># </span>{tagName}</div>
                                        ))
                                    }
                                </div>
                                <div className="home_middle_post_reaction_main">
                                    <div className="home_middle_post_reaction_container">
                                        <div className="home_middle_post_like_bg">
                                            {
                                                postInfo && postInfo.userliked && loggedUserInfo && postInfo.userliked.includes(loggedUserInfo._id) ?
                                                    <HeartIcon cssClass="home_middle_post_like_icon_active" /> :
                                                    <HeartLightIcon cssClass="home_middle_post_like_icon" />
                                            }
                                        </div>
                                        <div className="home_middle_post_like_count">{postInfo?.userliked.length ?? 0} Liked</div>
                                    </div>
                                </div>
                            </a>
                        </PageLink>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PostCard;
