import useForm from '../../hooks/useForm';

const CommentTextArea = (props) => {

    const { placeholder, cssClass, btnText, postid, loggedUserInfo, parentreplyinfo = null, cancelAction = false, showCancelBtn = false, addCommentLoading, handleAddComment, errorMessage } = props;
    const { handleFormField, postForm } = useForm();

    return (
        <form style={{ width: '100%' }} onSubmit={(e) => handleAddComment(e, postForm.content, { postid, userInfo: loggedUserInfo, parentreplyinfo })}>
            <textarea
                placeholder={placeholder}
                className={cssClass}
                name="content"
                onChange={handleFormField}
                value={postForm?.content ?? ''}
            />
            <div className="comment_add_btn_container">
                {
                    showCancelBtn &&
                    <button type="button" onClick={() => cancelAction ? cancelAction() : {}} className="comment_add_cancel_btn">Cancel</button>
                }
                <button type="submit" disabled={addCommentLoading} className={`comment_add_btn ${!showCancelBtn ? 'comment_add_move_right' : ''}`}>{btnText}</button>
            </div>

        </form>
    )

};

export default CommentTextArea;
