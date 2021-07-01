import { FileTextIcon, BookmarkLightIcon, PeopleIcon } from '../../icons';

const UserProfileLeftPanel = (props) => {

    const { userFollowInfo, userInfo, currentView, handleChangeView } = props;

    return (
        <div className="user_left_post_data_container">
            <div onClick={() => handleChangeView('publish')} className={`user_left_post_data_info_container ${currentView === 'publish' ? 'active' : ''}`}>
                <FileTextIcon cssClass="icon" />
                <div className="text">{userInfo?.postcount ?? ''} posts published</div>
            </div>
            <div onClick={() => handleChangeView('save')} className={`user_left_post_data_info_container ${currentView === 'save' ? 'active' : ''}`}>
                <BookmarkLightIcon cssClass="icon" />
                <div className="text">{userInfo?.userData?.usersavedpost.length ?? ''} posts saved</div>
            </div>
            <div onClick={() => handleChangeView('follower')} className={`user_left_post_data_info_container ${currentView === 'follower' ? 'active' : ''}`}>
                <PeopleIcon cssClass="icon" />
                <div className="text">{userFollowInfo && userFollowInfo.userFollowArray.length} Follower</div>
            </div>
            <div onClick={() => handleChangeView('following')} className={`user_left_post_data_info_container ${currentView === 'following' ? 'active' : ''}`}>
                <PeopleIcon cssClass="icon" />
                <div className="text">{userFollowInfo && userFollowInfo.userFollowingArray.length} Followings</div>
            </div>
        </div>
    )
}

export default UserProfileLeftPanel;

