import withApollo from '../../hoc/withApollo';
import { useGetPostByUser } from '../../apollo/apolloActions';
import PageLink from '../../components/PageLink';

const UserPostList = ({ postid, userName }) => {

    const { data, loading, error } = useGetPostByUser(postid);

    return (
        <div>
            <div className="post_id_right_user_post_heading">More from <span className="highlight">{userName ? `${userName[0].toUpperCase()}${userName.slice(1).toLowerCase()}` : ''}</span></div>
            <div className="post_id_right_user_post_list_container">
                {
                    data && data.getPostByUser && data.getPostByUser.postList &&
                    data.getPostByUser.postList.map((postInfo, index) => (
                        <PageLink href={'/post/[postID]'} as={`/post/${postInfo._id}`} key={index}>
                            <div className="user_post_list">
                                <div className="post_heading">{postInfo.title ?? ''}</div>
                                <div className="tag_container">
                                    {
                                        postInfo.tags &&
                                        postInfo.tags.split(',').slice(0, 3).map((tagName, index) => (
                                            <div className="tagName" key={index}><span className="light_text">#</span> {tagName}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </PageLink>
                    ))
                }
            </div>
            {error && <div></div>}
        </div>
    )

}

export default withApollo(UserPostList);