import { Fragment } from 'react';
import CommentItem from './CommentItem';
import CommentTextArea from './CommentTextArea';

const CommentList = (props) => {

    const { commentList, loggedUserInfo, handleAddComment, postid, addCommentLoading } = props;

    return (
        <div className="post_id_middle_comment_list_container">
            <div className="post_id_middle_comment_card_container">
                <div className="dev">Dev</div>
                <CommentTextArea
                    placeholder={`Add to the discussion`}
                    cssClass={"comment_text_area"}
                    btnText={addCommentLoading ? "Commenting..." : "Add Comment"}
                    handleAddComment={handleAddComment}
                    loggedUserInfo={loggedUserInfo}
                    postid={postid}
                    addCommentLoading={addCommentLoading}
                />
            </div>
            {
                commentList.commentList.length > 0 &&
                commentList.commentList.map((commentInfo, index) => (
                    <Fragment>
                        <CommentItem
                            key={index}
                            commentInfo={commentInfo}
                            loggedUserInfo={loggedUserInfo}
                            postid={postid}
                        />
                    </Fragment>
                ))
            }
        </div>
    )

}

export default CommentList;
