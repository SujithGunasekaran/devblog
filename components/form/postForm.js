import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import gfm from 'remark-gfm';

const PostForm = (props) => {

    const { showPreview, postForm, handleFormField } = props;

    const { data, content } = matter(postForm?.content ?? '');

    const markdownText = {
        ...data,
        content
    }

    return (
        <form>
            <input
                type="text"
                className="post_form_input"
                name="title"
                placeholder="Title"
                value={postForm?.title ?? ''}
                onChange={handleFormField}
            />
            {
                showPreview ?
                    <div className="post_form_textarea">
                        <ReactMarkdown remarkPlugins={[gfm]}>{markdownText?.content ?? ''}</ReactMarkdown>
                    </div> :
                    <textarea
                        className="post_form_textarea"
                        placeholder="content"
                        name="content"
                        value={postForm?.content ?? ''}
                        onChange={handleFormField}
                    />
            }

        </form>
    )

}

export default PostForm;
