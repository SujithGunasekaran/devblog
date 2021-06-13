import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import HeaderTag from '../../components/HeadTag';
import withApollo from '../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useGetPostById } from '../../apollo/apolloActions';

const PostDisplay = dynamic(() => import('../../components/post/FullPostInfo'));
const Reaction = dynamic(() => import('../../components/panel/leftPanel/PostLeftPanel'));

const PostInfo = () => {

    const router = useRouter();
    const { postID } = router.query;

    const { data, loading, error } = useGetPostById(postID);

    // data.getPostById.postInfo

    return (
        <div>
            <HeaderTag
                isLogoNameNeeded={false}
                title={"Post Info"}
                description={"Get knowledge from the amazing developer posts"}
                keyword={"React.js, Javascript, devBlog, devBlog Heroku"}
            />
            <div className="post_id_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                            <div className="post_id_left_container">
                                <Reaction />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="post_id_middle_container">
                                {
                                    data && data.getPostById && data.getPostById.postInfo &&
                                    <PostDisplay
                                        postData={data.getPostById.postInfo}
                                    />
                                }
                            </div>
                        </div>
                        <div className="col-md-3">
                            Post created user detail
                        </div>
                    </div>
                </div>
            </div>
            {
                error && <div></div>
            }
        </div>
    )

}

export default withApollo(PostInfo, { getDataFromTree });
