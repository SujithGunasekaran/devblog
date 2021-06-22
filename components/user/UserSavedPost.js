import dynamic from 'next/dynamic';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserSavePost = (props) => {

    const { userInfo } = props;

    const handleEdit = (postid, userid) => {
        console.log("Edit", postid);
    }

    const handleDelete = (postid, userid) => {
        console.log("Delete", postid);
    }

    return (
        <div>
            {
                userInfo && userInfo.userData && userInfo.userData.usersavedpost &&
                    userInfo.userData.usersavedpost.length > 0 ?
                    userInfo.userData.usersavedpost.map((postData, index) => {
                        const isUserCanEdit = userInfo.loggedUserInfo ? userInfo.loggedUserInfo._id === postData.postid.user._id ? true : false : false;
                        return (
                            <PostCard
                                key={index}
                                postCreatedUser={postData?.postid?.user?._id ?? ''}
                                postInfo={postData.postid}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                loggedUserInfo={userInfo.loggedUserInfo}
                                isUserCanEdit={isUserCanEdit ? true : false}
                            />
                        )
                    }) :
                    <div className="zero_post_message">You have not saved any post</div>
            }
        </div>
    )

}

export default UserSavePost;


