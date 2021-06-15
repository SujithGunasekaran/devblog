import { HeartLightIcon, BookmarkLightIcon } from '../../icons';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const PostLeftPanel = (props) => {

    const { postData, handleLikeReaction, handleSaveReaction } = props;

    const isUserLikedThePost = postData && postData.getPostById && postData.getPostById.loggedUserid ? postData.getPostById.postInfo.userliked.includes(postData.getPostById.loggedUserid) : false
    const isUserSavedThePost = postData && postData.getPostById && postData.getPostById.loggedUserid ? postData.getPostById.postInfo.usersaved.includes(postData.getPostById.loggedUserid) : false


    return (
        <>
            <div className="post_id_left_icon_container">
                <Tooltip TransitionComponent={Zoom} title={postData && postData.getPostById && postData.getPostById.isUserLikedThePost ? 'Dislike' : 'Like'} arrow>
                    <div className="post_id_left_heart_icon_bg" onClick={() => handleLikeReaction(isUserLikedThePost, postData.getPostById.loggedUserid)}>
                        <HeartLightIcon cssClass={isUserLikedThePost ? "post_id_left_heart_icon_active" : "post_id_left_heart_icon"} />
                    </div>
                </Tooltip>
                <div className="post_id_left_count">{postData?.getPostById?.postInfo?.userliked.length ?? ''}</div>
            </div>
            <div className="post_id_left_icon_container">
                <Tooltip TransitionComponent={Zoom} title={postData && postData.getPostById && postData.getPostById.isUserSavedThePost ? 'unSave' : 'Save'} arrow>
                    <div className="post_id_left_save_icon_bg" onClick={() => handleSaveReaction(isUserSavedThePost, postData.getPostById.loggedUserid)}>
                        <BookmarkLightIcon cssClass={isUserSavedThePost ? "post_id_left_save_icon_active" : "post_id_left_save_icon"} />
                    </div>
                </Tooltip>
                <div className="post_id_left_count">{postData?.getPostById?.postInfo?.usersaved.length ?? ''}</div>
            </div>
        </>
    )

}

export default PostLeftPanel;

