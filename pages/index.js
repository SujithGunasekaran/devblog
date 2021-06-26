import { useState, useEffect } from 'react';
import HeadTag from '../components/HeadTag';
import withApollo from '../hoc/withApollo';
import dynamic from 'next/dynamic';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useGetAllPost } from '../apollo/apolloActions';
import { getCurrentDateByType } from '../utils';
import Tabs from '../components/Tabs';

const DevLeftPanel = dynamic(() => import('../components/panel/leftPanel/HomeLeftPanel'));
const PostCard = dynamic(() => import('../components/post/PostCard'));

const Home = () => {

  const [currentFilter, setCurrentFilter] = useState('Feed');

  // query and mutation
  const [getAllPost, { data: post, loading: postLoading, error: postError }] = useGetAllPost();

  // useEffect
  useEffect(() => {
    getAllPost({ variables: { startDate: '' } });
  }, [])

  const handleTabChange = (resultType) => {
    if (currentFilter.toLocaleLowerCase() !== resultType) {
      setCurrentFilter(resultType);
      const startDate = getCurrentDateByType(resultType);
      getAllPost({ variables: { startDate } });
    }
  }

  console.log(currentFilter);

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
                {/* <div onClick={() => handleTabChange('feed')} className={`home_middle_head_date_name ${currentFilter === 'feed' ? 'active' : ''}`}>Feed</div>
                <div onClick={() => handleTabChange('week')} className={`home_middle_head_date_name ${currentFilter === 'week' ? 'active' : ''}`}>Week</div>
                <div onClick={() => handleTabChange('month')} className={`home_middle_head_date_name ${currentFilter === 'month' ? 'active' : ''}`}>Month</div>
                <div onClick={() => handleTabChange('year')} className={`home_middle_head_date_name ${currentFilter === 'year' ? 'active' : ''}`}>Year</div> */}
              </div>
            </div>
            {
              (!post || !post.getAllPost) && !postLoading &&
              <p className="not_available_message">No post Available...</p>
            }
            {
              post && post.getAllPost &&
              post.getAllPost.postList.map((postInfo, index) => (
                <PostCard
                  key={index}
                  postInfo={postInfo}
                  loggedUserInfo={post.getAllPost.loggedUserInfo}
                />
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
