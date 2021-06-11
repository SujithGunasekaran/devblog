import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const PostForm = (props) => {

    const { showPreview, postForm, publishLoading, handleFormField, handlePublishPost } = props;

    let customRenderers = {}

    if (showPreview) {
        customRenderers = {
            code(code) {
                const { className, children } = code;
                const language = className && className.split('-')[1];
                return (
                    <SyntaxHighlighter
                        style={atomDark}
                        language={language}
                        children={children}
                    />
                );
            }
        }
    };

    return (
        <form onSubmit={handlePublishPost}>
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
                        <ReactMarkdown remarkPlugins={[gfm, { singleTilde: false }]} skipHtml={false} components={customRenderers} children={postForm?.content ?? ''} />
                    </div> :
                    <textarea
                        className="post_form_textarea"
                        placeholder="content"
                        name="content"
                        value={postForm?.content ?? ''}
                        onChange={handleFormField}
                    />
            }
            <button disabled={publishLoading} className={`post_form_publish_btn ${publishLoading ? 'disabled' : ''}`}>Publish</button>
        </form>
    )

}

export default PostForm;
