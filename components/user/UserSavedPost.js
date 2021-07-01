import dynamic from 'next/dynamic';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserSavePost = (props) => {

    const { userInfo, handleEditPost, handleDeletePost, emptyMessage = "" } = props;

    return (
        <div>
            {
                userInfo && userInfo.userData && userInfo.userData.usersavedpost &&
                    userInfo.userData.usersavedpost.length > 0 ?
                    userInfo.userData.usersavedpost.map((postData, index) => {
                        const isUserCanEdit = userInfo.loggedUserInfo ? userInfo.loggedUserInfo._id === postData.user._id ? true : false : false;
                        return (
                            <PostCard
                                key={index}
                                postCreatedUser={postData?.user?._id ?? ''}
                                postInfo={postData}
                                handleDelete={handleDeletePost}
                                handleEdit={handleEditPost}
                                loggedUserInfo={userInfo.loggedUserInfo}
                                isUserCanEdit={isUserCanEdit ? true : false}
                            />
                        )
                    }) :
                    <div className="not_available_message">{emptyMessage}</div>
            }
        </div>
    )

}

export default UserSavePost;


