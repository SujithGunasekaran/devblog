import dynamic from 'next/dynamic';
import { isUserCanEditOrDelete } from '../../utils';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserCreatedPost = (props) => {

    const { posts } = props;

    const handleEdit = (postid) => {
        console.log("Edit", postid);
    }

    const handleDelete = (postid) => {
        console.log("Delete", postid);
    }

    return (
        <div>
            {
                posts && posts.postInfo &&
                posts.postInfo.map((postData, index) => {
                    const isUserCanEdit = isUserCanEditOrDelete(posts.loggedUserInfo, postData.user);
                    return (
                        <PostCard
                            key={index}
                            postInfo={postData}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
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


