import { FileTextIcon, BookmarkLightIcon } from '../../icons';

const UserProfileLeftPanel = ({ userInfo, currentView, handleChangeView }) => {
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
        </div>
    )
}

export default UserProfileLeftPanel;

