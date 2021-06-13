import { HeartIcon, HeartLightIcon, BookmarkLightIcon } from '../../icons';


const PostLeftPanel = (props) => {

    return (
        <>
            <div className="post_id_left_icon_container">
                <div className="post_id_left_heart_icon_bg">
                    <HeartLightIcon cssClass="post_id_left_heart_icon" />
                    {/* <HeartIcon cssClass="post_id_left_heart_icon_dark" /> */}
                </div>
                <div className="post_id_left_count">0</div>
            </div>
            <div className="post_id_left_icon_container">
                <div className="post_id_left_save_icon_bg">
                    <BookmarkLightIcon cssClass="post_id_left_save_icon" />
                </div>
                <div className="post_id_left_count">0</div>
            </div>
        </>
    )

}

export default PostLeftPanel;

