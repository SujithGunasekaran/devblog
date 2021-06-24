import dynamic from 'next/dynamic';

const Markdown = dynamic(() => import('../markdowns/MarkdownRender'));

const PostForm = (props) => {

    const { showPreview, postForm, btnText, btnLoadingText, postLoading, handleFormField, handlePostData } = props;

    return (
        <form onSubmit={handlePostData}>
            <div className="row">
                <div className="col-md-6">
                    <input
                        type="text"
                        className={`post_form_input ${showPreview ? 'hide_border' : ''}`}
                        name="title"
                        placeholder={showPreview ? '' : 'Title'}
                        value={postForm?.title ?? ''}
                        onChange={handleFormField}
                    />
                </div>
                {
                    !showPreview &&
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="post_form_input"
                            name="tags"
                            placeholder={showPreview ? '' : 'Tags with comma seperate'}
                            value={postForm?.tags ?? ''}
                            onChange={handleFormField}
                        />
                    </div>
                }
            </div>
            {
                showPreview ?
                    <div className={`post_form_textarea hide_border`}>
                        <Markdown content={postForm?.content ?? ''} />
                    </div> :
                    <textarea
                        className="post_form_textarea"
                        placeholder="content"
                        name="content"
                        value={postForm?.content ?? ''}
                        onChange={handleFormField}
                    />
            }
            <button disabled={postLoading} className='post_form_publish_btn'>{postLoading ? btnLoadingText : btnText}</button>
        </form>
    )

}

export default PostForm;
