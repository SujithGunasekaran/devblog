import { HeartLightIcon, EditSquareIcon, DeleteIcon } from '../icons';
import { convertFullDateToShort, prettyUserName } from '../../utils';
import PageLink from '../PageLink';

const PostCard = (props) => {

    const { postInfo, loggedUserInfo, isUserCanEdit = false, handleEdit, handleDelete } = props;
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
                                    <div className="home_middle_post_reaction_container">
                                        <div className="home_middle_post_like_bg">
                                            <EditSquareIcon postid={postInfo._id} cssClass={"home_middle_post_edit_icon"} handleEvent={handleEdit} />
                                        </div>
                                    </div>
                                }
                                {
                                    isUserCanEdit &&
                                    <div className="home_middle_post_reaction_container">
                                        <div className="home_middle_post_like_bg">
                                            <DeleteIcon postid={postInfo._id} cssClass={"home_middle_post_delete_icon"} handleEvent={handleDelete} />
                                        </div>
                                    </div>
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
                                            <HeartLightIcon cssClass={postInfo && postInfo.userliked && loggedUserInfo && postInfo.userliked.includes(loggedUserInfo._id) ? "home_middle_post_like_icon_active" : "home_middle_post_like_icon"} />
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
