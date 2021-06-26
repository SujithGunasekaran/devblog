import { HeartLightIcon, HeartIcon, BookmarkIcon, BookmarkLightIcon } from '../../icons';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const PostLeftPanel = (props) => {

    const { postData, likeLoading, saveLoading, handleLikeReaction, handleSaveReaction } = props;

    const isUserLikedThePost = postData && postData.getPostById && postData.getPostById.loggedUserid ? postData.getPostById.postInfo.userliked.includes(postData.getPostById.loggedUserid) : false
    const isUserSavedThePost = postData && postData.getPostById && postData.getPostById.loggedUserid ? postData.getPostById.postInfo.usersaved.includes(postData.getPostById.loggedUserid) : false


    return (
        <>
            <div className="post_id_left_icon_container">
                {
                    isUserLikedThePost ?
                        <Tooltip TransitionComponent={Zoom} title={'Dislike'} arrow>
                            <div className="post_id_left_heart_icon_bg" onClick={() => !likeLoading && handleLikeReaction(isUserLikedThePost, postData.getPostById.loggedUserid)}>
                                <HeartIcon cssClass="post_id_left_heart_icon_active" />
                            </div>
                        </Tooltip> :
                        <Tooltip TransitionComponent={Zoom} title={'Like'} arrow>
                            <div className="post_id_left_heart_icon_bg" onClick={() => !likeLoading && handleLikeReaction(isUserLikedThePost, postData.getPostById.loggedUserid)}>
                                <HeartLightIcon cssClass="post_id_left_heart_icon" />
                            </div>
                        </Tooltip>
                }

                <div className="post_id_left_count">{postData?.getPostById?.postInfo?.userliked.length ?? ''}</div>
            </div>
            <div className="post_id_left_icon_container">
                {
                    isUserSavedThePost ?
                        <Tooltip TransitionComponent={Zoom} title={'unSave'} arrow>
                            <div className="post_id_left_save_icon_bg" onClick={() => !saveLoading && handleSaveReaction(isUserSavedThePost, postData.getPostById.loggedUserid)}>
                                <BookmarkIcon cssClass="post_id_left_save_icon_active" />
                            </div>
                        </Tooltip> :
                        <Tooltip TransitionComponent={Zoom} title={'Save'} arrow>
                            <div className="post_id_left_save_icon_bg" onClick={() => !saveLoading && handleSaveReaction(isUserSavedThePost, postData.getPostById.loggedUserid)}>
                                <BookmarkLightIcon cssClass="post_id_left_save_icon" />
                            </div>
                        </Tooltip>
                }

                <div className="post_id_left_count">{postData?.getPostById?.postInfo?.usersaved.length ?? ''}</div>
            </div>
        </>
    )

}

export default PostLeftPanel;

