import { useEffect, Fragment, useState } from 'react';
import { prettyUserName, convertFullDateToShort } from '../../utils';
import PageLink from '../PageLink';
import { ReplyIcon } from '../icons';
import CommentTextArea from './CommentTextArea';
import withApollo from '../../hoc/withApollo';
import { useAddComment } from '../../apollo/apolloActions';
import ErrorMessage from '../UI/ErrorMessage';

const CommentItem = (props) => {

    // state
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(null);

    // query and mutation
    const [addComment, { loading, error }] = useAddComment();

    const { commentInfo, loggedUserInfo, postid } = props;
    const username = prettyUserName(commentInfo?.userinfo?.username ?? '');

    useEffect(() => {
        const childElement = document.querySelector('#childID');
        childElement.addEventListener('click', function (e) {
            if (e.target.closest('.post_id_middle_comment_parent_container')) {
                e.preventDefault();
                const parentPost = childElement.dataset.parentid;
                document.querySelector(`#parent_${parentPost}`).scrollIntoView({ behavior: 'smooth' });
            }
        });
    }, [])

    const handleAddCommentToPost = async (e, content, commentIdsInfo) => {
        e.preventDefault();
        if (commentIdsInfo.userInfo) {
            if (!content) {
                setShowErrorMessage('Please Enter some content');
                return;
            }
            try {
                const commentData = {
                    content: content,
                    postid: commentIdsInfo.postid,
                    userinfo: commentIdsInfo.userInfo._id,
                    parentreplyinfo: commentIdsInfo.parentreplyinfo
                };
                await addComment({ variables: { ...commentData } })
                setShowReplyBox(false);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    const handleCloseErrorMessage = () => {
        setShowErrorMessage(null);
    }

    return (
        <Fragment>
            <div className="post_id_middle_comment_card_container">
                <img src={commentInfo.userinfo.userprofile} className="user_profile"></img>
                <div className="post_id_middle_comment_card" id={`parent_${commentInfo._id}`}>
                    <div className="post_id_middle_comment_user_info">
                        <PageLink href='/user/[userID]' as={`/user/${commentInfo?.userinfo._id ?? ''}`}>
                            <a>
                                <div className="post_id_middle_comment_username">{username}</div>
                            </a>
                        </PageLink>
                        <div className="post_id_middle_comment_date">{convertFullDateToShort(commentInfo.createdAt)}</div>
                    </div>
                    {
                        commentInfo.parentreplyinfo &&
                        <div className="post_id_middle_comment_parent_container" data-parentid={commentInfo.parentreplyinfo._id} id="childID" title='Go to that post'>
                            <div className="post_id_middle_comment_parent_heading_container">
                                <div className="post_id_middle_comment_parent_heading">Replied To :</div>
                                <div className="parent_username">{prettyUserName(commentInfo.parentreplyinfo.userinfo.username)}</div>
                            </div>
                            <div className="parent_content">{commentInfo?.parentreplyinfo?.content ?? ''}</div>
                        </div>
                    }
                    <div className="post_id_middle_comment_content">{commentInfo?.content ?? ''}</div>
                </div>
            </div>
            {
                showReplyBox &&
                <Fragment>
                    {
                        showErrorMessage &&
                        <ErrorMessage
                            message={showErrorMessage}
                            cssClass="comment_message"
                            handleCloseErrorMessage={handleCloseErrorMessage}
                        />
                    }
                    <div className="post_id_middle_comment_card_container">
                        <img src={loggedUserInfo.userprofile} className="user_profile"></img>
                        <CommentTextArea
                            placeholder={`Replying to ${username}`}
                            cssClass={"comment_text_area"}
                            btnText={loading ? "Replying..." : "Reply"}
                            showCancelBtn={true}
                            cancelAction={() => setShowReplyBox(false)}
                            postid={postid}
                            loggedUserInfo={loggedUserInfo}
                            parentreplyinfo={commentInfo._id}
                            addCommentLoading={loading}
                            handleAddComment={handleAddCommentToPost}
                        />
                    </div>
                </Fragment>
            }
            {!showReplyBox && loggedUserInfo && <button onClick={() => setShowReplyBox(true)} className="post_id_middle_comment_reply_btn">Reply <ReplyIcon cssClass={"post_id_middle_comment_reply_icon"} /></button>}
            {error && <div></div>}
        </Fragment>

    )

}

export default withApollo(CommentItem);
