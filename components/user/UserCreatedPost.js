import dynamic from 'next/dynamic';
import { isUserCanEditOrDelete } from '../../utils';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserCreatedPost = (props) => {

    const { posts, handleEditPost, handleDeletePost, emptyMessage = "" } = props;

    return (
        <div>
            {
                posts && posts.postInfo &&
                    posts.postInfo.length > 0 ?
                    posts.postInfo.map((postData, index) => {
                        const isUserCanEdit = isUserCanEditOrDelete(posts.loggedUserInfo, postData.user);
                        return (
                            <PostCard
                                key={index}
                                postCreatedUser={postData?.user?._id ?? ''}
                                postInfo={postData}
                                handleDelete={handleDeletePost}
                                handleEdit={handleEditPost}
                                loggedUserInfo={posts.loggedUserInfo}
                                isUserCanEdit={isUserCanEdit ? true : false}
                            />
                        )
                    }) :
                    <div className="not_available_message">{emptyMessage}</div>
            }
        </div>
    )

}

export default UserCreatedPost;


