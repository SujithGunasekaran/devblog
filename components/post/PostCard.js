import dynamic from 'next/dynamic';
import { checkIsUserLikedPost, convertFullDateToShort } from '../../utils';

const { HeartIcon } = {
    HeartIcon: dynamic(() => import('../icons').then(component => component.HeartIcon))
}


const PostCard = (props) => {

    const { postInfo, userLikedList } = props;
    const isUserLikedPost = checkIsUserLikedPost(postInfo._id, userLikedList);
    let createdPostDate = convertFullDateToShort(postInfo.createdAt);

    return (
        <div>
            <div className="home_middle_post_container">
                <div className="home_middle_post_user_container">
                    <img src={`${postInfo?.user.userprofile}` ?? ''} alt={postInfo?.user?.username ?? ''} loading="lazy" className="home_middle_post_user_profile" />
                    <div className="home_middle_post_user_info_display">
                        <div className="home_middle_post_user_name">{postInfo?.user ? `${postInfo.user.username[0].toUpperCase()}${postInfo.user.username.slice(1).toLowerCase()}` : ''}</div>
                        <div className="home_middle_post_date">{createdPostDate ? createdPostDate : ''}</div>
                        <div className="home_middle_post_title">{postInfo?.title ?? ''}</div>
                        <div className="home_middle_post_tag_display">
                            {
                                postInfo.tags && postInfo.tags.split(",").map((tagName, index) => (
                                    <div className="home_middle_post_tag" key={index}><span className="light_text"># </span>{tagName}</div>
                                ))
                            }
                        </div>
                        <div className="home_middle_post_reaction_container">
                            <div className="home_middle_post_like_bg">
                                <HeartIcon cssClass={isUserLikedPost ? 'home_middle_post_like_icon active_icon' : 'home_middle_post_like_icon'} />
                            </div>
                            <div className="home_middle_post_like_count">{postInfo?.like ?? 0} Liked</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PostCard;
