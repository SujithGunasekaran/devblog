import dynamic from 'next/dynamic';
import PageLink from '../PageLink';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserSavePost = (props) => {

    const { userInfo } = props;

    return (
        <div>
            {
                userInfo && userInfo.userData && userInfo.userData.usersavedpost &&
                    userInfo.userData.usersavedpost.length > 0 ?
                    userInfo.userData.usersavedpost.map((postData, index) => (
                        <PageLink
                            key={index}
                            href={'/post/[postID]'} as={`/post/${postData.postid._id}`}
                        >
                            <a className="home_middle_post_link">
                                <PostCard
                                    postInfo={postData.postid}
                                    loggedUserInfo={userInfo.loggedUserInfo}
                                />
                            </a>
                        </PageLink>
                    )) :
                    <div className="zero_post_message">You have not saved any post</div>
            }
        </div>
    )

}

export default UserSavePost;


