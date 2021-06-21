import dynamic from 'next/dynamic';
import { isUserCanEditOrDelete } from '../../utils';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserCreatedPost = (props) => {

    const { posts } = props;

    const handleEdit = (postid, userid) => {
        console.log("Edit", postid, userid);
    }

    const handleDelete = (postid, userid) => {
        console.log("Delete", postid, userid);
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
                            postCreatedUser={postData?.user ?? ''}
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


