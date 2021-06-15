import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import HeaderTag from '../../components/HeadTag';
import withApollo from '../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useGetPostById, useSetLikeToPost, useSetSaveToPost } from '../../apollo/apolloActions';

const PostDisplay = dynamic(() => import('../../components/post/FullPostInfo'));
const Reaction = dynamic(() => import('../../components/panel/leftPanel/PostLeftPanel'));

const PostInfo = () => {

    const router = useRouter();

    const [postID, postTitle] = router.query.postID;

    // query and mutation
    const { data, loading, error: postError } = useGetPostById(postID);
    const [setLikeToPost, { error: likeError }] = useSetLikeToPost();
    const [setSaveToPost, { error: saveError }] = useSetSaveToPost();

    const handleLikeReaction = async (userLiked, isUserLoggedIn) => {
        if (data.getPostById && isUserLoggedIn) {
            try {
                await setLikeToPost({
                    variables: {
                        postid: postID,
                        type: userLiked ? 'remove' : 'add'
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    const handleSaveReaction = async (userSaved, isUserLoggedIn) => {
        if (data.getPostById && isUserLoggedIn) {
            try {
                await setSaveToPost({
                    variables: {
                        postid: postID,
                        type: userSaved ? 'remove' : 'add'
                    }
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <HeaderTag
                isLogoNameNeeded={false}
                title={postTitle}
                description={postTitle}
                keyword={"React.js, Javascript, devBlog, devBlog Heroku"}
            />
            <div className="post_id_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                            <div className="post_id_left_container">
                                <Reaction
                                    postData={data}
                                    handleLikeReaction={handleLikeReaction}
                                    handleSaveReaction={handleSaveReaction}
                                />
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
                (postError || likeError || saveError) && <div></div>
            }
        </div>
    )

}

export default withApollo(PostInfo, { getDataFromTree });
