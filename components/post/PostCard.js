import dynamic from 'next/dynamic';

const { HeartIcon } = {
    HeartIcon: dynamic(() => import('../icons').then(component => component.HeartIcon))
}


const PostCard = ({ postInfo }) => {

    return (
        <div>
            <div className="home_middle_post_container">
                <div className="home_middle_post_user_container">
                    <img src={`${postInfo?.user.userprofile}` ?? ''} loading="lazy" className="home_middle_post_user_profile" />
                    <div className="home_middle_post_user_info_display">
                        <div className="home_middle_post_user_name">{postInfo?.user ? `${postInfo.user.username[0].toUpperCase()}${postInfo.user.username.slice(1).toLowerCase()}` : ''}</div>
                        <div className="home_middle_post_date">June 6</div>
                        <div className="home_middle_post_title">{postInfo?.title ?? ''}</div>
                        <div className="home_middle_post_tag_display">
                            {
                                postInfo.tags.split(",").map((tagName, index) => (
                                    <div className="home_middle_post_tag" key={index}><span className="light_text"># </span>{tagName}</div>
                                ))
                            }
                        </div>
                        <div className="home_middle_post_reaction_container">
                            <div className="home_middle_post_like_bg">
                                <HeartIcon cssClass={'home_middle_post_like_icon'} />
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
