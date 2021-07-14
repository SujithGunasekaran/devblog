import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import HeadTag from '../components/HeadTag';
import withApollo from '../hoc/withApollo';
import dynamic from 'next/dynamic';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useGetAllPost } from '../apollo/apolloActions';
import { getCurrentDateByType } from '../utils';
import Tabs from '../components/Tabs';
import CircularLoading from '../components/UI/CircularLoading';

const DevLeftPanel = dynamic(() => import('../components/panel/leftPanel/HomeLeftPanel'));
const PostCard = dynamic(() => import('../components/post/PostCard'));

const Home = () => {

  // state
  const [currentFilter, setCurrentFilter] = useState('Feed');
  const [loadingPost, setLoadingPost] = useState(false);

  // ref
  const postRef = useRef();

  // query and mutation
  const [getAllPost, { data: post, loading: postLoading, error: postError, fetchMore }] = useGetAllPost();

  // useEffect
  useEffect(() => {
    getAllPost({ variables: { startDate: '', skipPost: 0 } });
  }, [])

  const handleTabChange = (resultType) => {
    if (currentFilter.toLocaleLowerCase() !== resultType) {
      setCurrentFilter(resultType);
      const startDate = getCurrentDateByType(resultType);
      getAllPost({ variables: { startDate, skipPost: 0 } });
    }
  }

  const loadMorePost = useCallback(async () => {
    setLoadingPost(true);
    const startDate = getCurrentDateByType(currentFilter);
    if (!loadingPost && post) {
      try {
        await fetchMore({
          variables: { startDate, skipPost: post.getAllPost.postToBeSkipped },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;
            return {
              getAllPost: {
                ...fetchMoreResult.getAllPost,
                postList: [
                  ...prevResult.getAllPost.postList,
                  ...fetchMoreResult.getAllPost.postList,
                ]
              }
            }
          }
        })
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoadingPost(false);
      }
    }
  })

  const postObserver = useCallback((postElement) => {

    if (postRef.current) postRef.current.disconnect();
    postRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && post && post.getAllPost.hasMore) {
        loadMorePost();
      }
    })
    if (postElement) postRef.current.observe(postElement);

  })

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
              <div className="home_middle_head_date_conatiner">
                <Tabs
                  currentTab={currentFilter}
                  cssClass="home_middle_head_date_name"
                  tabList={['Feed', 'Week', 'Month', 'Year']}
                  handleTab={handleTabChange}
                />
              </div>
              <div className="home_middle_head_date_container_mobile">
                <Tabs
                  currentTab={currentFilter}
                  cssClass="home_middle_head_date_name"
                  tabList={['Feed', 'Week', 'Month', 'Year']}
                  handleTab={handleTabChange}
                  showSelect={true}
                />
              </div>
            </div>
            {
              (!post || !post.getAllPost || post.getAllPost.postList.length === 0) && !postLoading &&
              <p className="not_available_message">{`No one has created a post ${currentFilter !== 'Feed' ? `for last one ${currentFilter}...` : '...'}`}</p>
            }
            {
              post && post.getAllPost &&
              post.getAllPost.postList.map((postInfo, index) => (
                <Fragment key={index}>
                  <PostCard
                    key={index}
                    length={post.getAllPost.postList.length}
                    index={index}
                    postObserver={postObserver}
                    postInfo={postInfo}
                    loggedUserInfo={post.getAllPost.loggedUserInfo}
                  />
                </Fragment>
              ))
            }
            {(loadingPost || postLoading) && <CircularLoading />}
          </div>
        </div>
      </div>
      {(postError) && <div></div>}
    </div>
  )
}

export default withApollo(Home, { getDataFromTree });
