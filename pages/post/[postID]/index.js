import { useCallback, useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import HeaderTag from '../../../components/HeadTag';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import {
    useGetPostById,
    useSetLikeToPost,
    useSetSaveToPost,
    useAddUserToFollow,
    useRemoveFollowedUser,
    useGetCommentByPostId,
    useAddComment
} from '../../../apollo/apolloActions';
import useModelControl from '../../../hooks/useModelControl';
import CircularLoading from '../../../components/UI/CircularLoading';
import SuccessMessage from '../../../components/UI/SuccessMessage';
import ErrorMessage from '../../../components/UI/ErrorMessage';

const PostDisplay = dynamic(() => import('../../../components/post/FullPostInfo'));
const Reaction = dynamic(() => import('../../../components/panel/leftPanel/PostLeftPanel'));
const LoginModel = dynamic(() => import('../../../components/models/ShowLoginModel'));
const UserInfo = dynamic(() => import('../../../components/panel/rightPanel/PostRightPanel'));
const CommentList = dynamic(() => import('../../../components/comment/CommentList'));

const PostInfo = () => {

    // states
    const [showSuccess, setShowSuccess] = useState(null);
    const [showError, setShowError] = useState(null);

    // hooks
    const { showModel, handleShowModel } = useModelControl(false);

    const router = useRouter();

    const { postID } = router.query;

    // query and mutation
    const { data, loading, error: postError } = useGetPostById(postID);
    const [setLikeToPost, { error: likeError, loading: likeLoading }] = useSetLikeToPost();
    const [setSaveToPost, { error: saveError, loading: saveLoading }] = useSetSaveToPost();
    const [addUserToFollow, { error: followError, loading: followLoading }] = useAddUserToFollow();
    const [removeFollowedUser, { error: unFollowError, loading: unFollowLoading }] = useRemoveFollowedUser();
    const [getComment, { data: commentData, error: commentError, loading: commentLoading }] = useGetCommentByPostId();
    const [addComment, { loading: addCommentLoading, error: addCommentError }] = useAddComment();

    // useEffect
    useEffect(() => {
        getCommentByPost();
    }, [])

    const getCommentByPost = () => {
        try {
            getComment({ variables: { postid: postID } });
        }
        catch (err) {
            console.log(err);
        }
    }

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
        else {
            handleShowModel(true);
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
        else {
            handleShowModel(true);
        }
    }

    const closeModel = useCallback(() => {
        handleShowModel(false);
    }, [showModel]);


    const handleFollowUser = async (visitorUserId) => {
        try {
            await addUserToFollow({ variables: { loggedUser: data.getPostById.loggedUserid, followUser: visitorUserId, postId: data.getPostById.postInfo._id } });
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleRemoveFollowedUser = async (visitorUserId) => {
        try {
            await removeFollowedUser({ variables: { loggedUser: data.getPostById.loggedUserid, followUser: visitorUserId, postId: data.getPostById.postInfo._id } });
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleCloseSuccessMessage = () => {
        setShowSuccess(null);
    }

    const handleCloseErrorMessage = () => {
        setShowError(null);
    }

    const scrollToMessageView = (id) => {
        if (document.querySelector(`${id}`)) document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth' });
    }

    const handleAddComment = async (e, content, commentIdsInfo) => {
        e.preventDefault();
        if (commentIdsInfo.userInfo) {
            if (!content) {
                setShowError('Please enter some content');
                scrollToMessageView('error_alert');
                return;
            }
            try {
                const addCommentData = {
                    content,
                    postid: commentIdsInfo.postid,
                    userinfo: commentIdsInfo.userInfo._id,
                    parentreplyinfo: commentIdsInfo.parentreplyinfo
                }
                await addComment({ variables: { ...addCommentData } });
                setShowSuccess(commentIdsInfo.parentreplyinfo ? 'Replied successfully' : 'Comment added successfully');
                scrollToMessageView('success_alert');
            }
            catch (err) {
                console.log(err);
                setShowError('Error while adding comment');
                scrollToMessageView('error_alert');
            }
        }
        else {
            handleShowModel(true);
        }
    }


    // UI

    const successMessage = () => (
        <SuccessMessage
            message={showSuccess}
            cssClass="comment_message"
            handleCloseSuccessMessage={handleCloseSuccessMessage}
        />
    );

    const errorMessage = () => (
        <ErrorMessage
            message={showError}
            cssClass="comment_message"
            handleCloseErrorMessage={handleCloseErrorMessage}
        />
    )


    return (
        <div>
            {
                data && data.getPostById && data.getPostById.postInfo ?
                    <HeaderTag
                        isLogoNameNeeded={false}
                        title={data.getPostById.postInfo.title}
                        description={data.getPostById.postInfo.title}
                        keyword={data.getPostById.postInfo.tags}
                    />
                    :
                    <HeaderTag />
            }

            <div className="post_id_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                            <div className="post_id_left_container">
                                <Reaction
                                    postData={data}
                                    likeLoading={likeLoading}
                                    saveLoading={saveLoading}
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
                            <div className="post_id_middle_container_reaction">
                                <Reaction
                                    postData={data}
                                    likeLoading={likeLoading}
                                    saveLoading={saveLoading}
                                    handleLikeReaction={handleLikeReaction}
                                    handleSaveReaction={handleSaveReaction}
                                />
                            </div>
                            <div className="post_id_middle_comment_container">
                                {
                                    commentLoading &&
                                    <CircularLoading />
                                }
                                {
                                    commentData && commentData.getCommentByPostId &&
                                    <Fragment>
                                        <div className="post_id_middle_comment_heading">Discussion ({commentData.getCommentByPostId.commentCount})</div>
                                        {
                                            showError &&
                                            errorMessage()
                                        }
                                        {
                                            showSuccess &&
                                            successMessage()
                                        }
                                        <CommentList
                                            commentList={commentData.getCommentByPostId}
                                            loggedUserInfo={commentData.getCommentByPostId.loggedUserInfo ? commentData.getCommentByPostId.loggedUserInfo : null}
                                            postid={commentData?.getCommentByPostId?.postid ?? ''}
                                            addCommentLoading={addCommentLoading}
                                            handleAddComment={handleAddComment}
                                        />
                                    </Fragment>
                                }
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="post_id_right_container">
                                {
                                    data && data.getPostById && data.getPostById.postInfo &&
                                    <UserInfo
                                        isLoggedInUserFollowing={data?.getPostById?.isLoggedInUserFollowing ?? false}
                                        loggedUserId={data?.getPostById?.loggedUserid ?? null}
                                        userInfo={data.getPostById.postInfo.user}
                                        postid={data.getPostById.postInfo._id}
                                        followLoading={followLoading}
                                        unFollowLoading={unFollowLoading}
                                        handleFollowUser={handleFollowUser}
                                        handleRemoveFollowedUser={handleRemoveFollowedUser}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModel &&
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="model_overlay">
                                <LoginModel
                                    closeModel={closeModel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                (
                    postError ||
                    likeError ||
                    saveError ||
                    followError ||
                    unFollowError ||
                    commentError ||
                    addCommentError
                ) && <div></div>
            }
        </div>
    )

}

export default withApollo(PostInfo, { getDataFromTree });
