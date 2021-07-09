import CommentItem from './CommentItem';

const CommentList = (props) => {

    const { commentList } = props;

    return (
        <div className="post_id_middle_comment_list_container">
            {
                commentList.commentList.length > 0 &&
                commentList.commentList.map((commentInfo, index) => (
                    <CommentItem
                        key={index}
                        commentInfo={commentInfo}
                    />
                ))
            }
        </div>
    )

}

export default CommentList;
