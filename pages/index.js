import HeadTag from '../components/HeadTag';
import withApollo from '../hoc/withApollo';
import dynamic from 'next/dynamic';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useGetAllPost } from '../apollo/apolloActions';
import PageLink from '../components/PageLink';

const DevLeftPanel = dynamic(() => import('../components/panel/leftPanel/HomeLeftPanel'));
const PostCard = dynamic(() => import('../components/post/PostCard'));

const Home = () => {

  // query and mutation
  const { data: post, loading: postLoading, error: postError } = useGetAllPost();

  return (
    <div>
      <HeadTag
        title="Home"
        description="devblog is an blog website people can publish their blog post"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <DevLeftPanel />
          </div>
          <div className="col-md-6">
            <div className="home_middle_head_container">
              <div className="home_middle_head_info">Posts</div>
            </div>
            {
              post && post.getAllPost &&
              post.getAllPost.postList.map((postInfo, index) => (
                <PageLink
                  key={index}
                  href={'/post/[...postID]'} as={`/post/${postInfo._id}/${postInfo.title}`}
                >
                  <a className="home_middle_post_link">
                    <PostCard
                      postInfo={postInfo}
                      loggedUserInfo={post.getAllPost.loggedUserInfo}
                    />
                  </a>
                </PageLink>
              ))
            }
          </div>
        </div>
      </div>
      {(postError) && <div></div>}
    </div>
  )
}

export default withApollo(Home, { getDataFromTree });
