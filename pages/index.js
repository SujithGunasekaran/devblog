import HeadTag from '../components/HeadTag';
import withApollo from '../hoc/withApollo';
import dynamic from 'next/dynamic';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useGetAllPost } from '../apollo/apolloActions';

const DevLeftPanel = dynamic(() => import('../components/DevInfoLeftPanel.js'), { loading: () => <div>Loading Panel...</div> });
const PostCard = dynamic(() => import('../components/post/PostCard'), { loading: () => <div>Loading Post...</div> });

const Home = () => {

  const { data: post, loading, error } = useGetAllPost();

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
                <PostCard
                  key={index}
                  postInfo={postInfo}
                />
              ))
            }
            {
              loading && <div>Loading Posts...</div>
            }
          </div>
        </div>
      </div>
      { error && <div></div>}
    </div>
  )
}

export default withApollo(Home, { getDataFromTree });
