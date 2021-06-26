import withApollo from '../../hoc/withApollo';
import { useGetPostByUser } from '../../apollo/apolloActions';
import PageLink from '../../components/PageLink';
import { prettyUserName } from '../../utils';

const UserPostList = ({ postid, userName, userid }) => {

    const { data, loading, error } = useGetPostByUser(postid);

    return (
        <div>
            <div className="post_id_right_user_post_heading">More from
                <PageLink href={'/user/[userID]'} as={`/user/${userid}`}>
                    <span className="highlight anchor" style={{ paddingLeft: '6px' }}>{prettyUserName(userName)}</span>
                </PageLink>
            </div>
            <div className="post_id_right_user_post_list_container">
                {
                    data && data.getPostByUser && data.getPostByUser.postList &&
                    data.getPostByUser.postList.map((postInfo, index) => (
                        <PageLink href={'/post/[postID]'} as={`/post/${postInfo._id}`} key={index}>
                            <div className={`user_post_list ${index < data.getPostByUser.postList.length - 1 ? 'border_active' : ''}`}>
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
