import HeadTag from '../components/HeadTag';
import withApollo from '../hoc/withApollo';
import dynamic from 'next/dynamic';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useGetAllPost, useGetUserLikedPost } from '../apollo/apolloActions';
import PageLink from '../components/PageLink';

const DevLeftPanel = dynamic(() => import('../components/panel/leftPanel/HomeLeftPanel'));
const PostCard = dynamic(() => import('../components/post/PostCard'));

const Home = () => {

  // query and mutation
  const { data: post, loading: postLoading, error: postError } = useGetAllPost();
  const { data: useLikedList, error: userLikedError } = useGetUserLikedPost();

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
                  href={'/post/[postID]'} as={`/post/${postInfo._id}`}
                >
                  <a className="home_middle_post_link">
                    <PostCard
                      postInfo={postInfo}
                      userLikedList={useLikedList}
                    />
                  </a>
                </PageLink>
              ))
            }
          </div>
        </div>
      </div>
      {(postError || userLikedError) && <div></div>}
    </div>
  )
}

export default withApollo(Home, { getDataFromTree });
