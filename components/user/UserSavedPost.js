import dynamic from 'next/dynamic';
import { isUserCanEditOrDelete } from '../../utils';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserSavePost = (props) => {

    const { userInfo } = props;

    const handleEdit = (postid) => {
        console.log("Edit", postid);
    }

    const handleDelete = (postid) => {
        console.log("Delete", postid);
    }

    return (
        <div>
            {
                userInfo && userInfo.userData && userInfo.userData.usersavedpost &&
                    userInfo.userData.usersavedpost.length > 0 ?
                    userInfo.userData.usersavedpost.map((postData, index) => {
                        const isUserCanEdit = isUserCanEditOrDelete(userInfo.loggedUserInfo, postData.postid.user);
                        return (
                            <PostCard
                                key={index}
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


