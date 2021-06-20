import dynamic from 'next/dynamic';
import PageLink from '../PageLink';

const PostCard = dynamic(() => import('../post/PostCard'));

const UserCreatedPost = (props) => {

    const { posts } = props;

    return (
        <div>
            {
                posts && posts.postInfo &&
                posts.postInfo.map((postData, index) => (
                    <PageLink
                        key={index}
                        href={'/post/[postID]'} as={`/post/${postData._id}`}
                    >
                        <a className="home_middle_post_link">
                            <PostCard
                                postInfo={postData}
                                loggedUserInfo={posts.loggedUserInfo}
                            />
                        </a>
                    </PageLink>
                ))
            }
        </div>
    )

}

export default UserCreatedPost;


