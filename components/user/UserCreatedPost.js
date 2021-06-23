import dynamic from 'next/dynamic';
import { isUserCanEditOrDelete } from '../../utils';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserCreatedPost = (props) => {

    const { posts, handleEditPost, handleDeletePost } = props;

    return (
        <div>
            {
                posts && posts.postInfo &&
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
                })
            }
        </div>
    )

}

export default UserCreatedPost;


