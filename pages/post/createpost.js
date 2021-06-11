import { useState } from 'react';
import dynamic from 'next/dynamic';
import HeaderTag from '../../components/HeadTag';
import useForm from '../../hooks/useForm';
import withApollo from '../../hoc/withApollo';
import { useCreatePost } from '../../apollo/apolloActions';
import { EditSquareIcon, EyeIcon, InfoCircleIcon, CancelIcon } from '../../components/icons';

const PostForm = dynamic(() => import('../../components/form/postForm'), { loading: () => <div>Loading...</div> });
const MarkdownGuide = dynamic(() => import('../../components/MakrdownGuide'), { loading: () => <div>Loading...</div> });


const CreatePost = () => {

    const [activeHeader, setActiveHeader] = useState('edit');
    const [showSuccess, setShowSuccess] = useState(null);
    const [showError, setShowError] = useState(null);

    const { postForm, handleFormField } = useForm();

    // query and action
    const [publishPost, { loading, error }] = useCreatePost();

    const handlePublishPost = async (e) => {
        e.preventDefault();
        let publishData = {
            ...postForm,
            like: 0
        };
        try {
            await publishPost({ variables: publishData });
            setShowSuccess('Post successfully published');
        }
        catch (err) {
            setShowError('Error while creating post')
        }
        finally {
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    return (
        <div>
            <HeaderTag
                title="Create Post"
                description="Create Post and publish"
            />
            <div className="post_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="post_header">
                                <div className="post_header_list">
                                    <div className={`post_header_info ${activeHeader === 'edit' ? 'active' : ''}`} onClick={() => setActiveHeader('edit')}>
                                        <EditSquareIcon cssClass="post_header_icon" />
                                        <div title="Edit Post" className="post_header_name">Edit</div>
                                    </div>
                                    <div className={`post_header_info ${activeHeader === 'preview' ? 'active' : ''}`} onClick={() => setActiveHeader('preview')}>
                                        <EyeIcon cssClass="post_header_icon" />
                                        <div title="Preview Post" className="post_header_name">Preview</div>
                                    </div>
                                    <div className={`post_header_info ${activeHeader === 'guide' ? 'active' : ''}`} onClick={() => setActiveHeader('guide')}>
                                        <InfoCircleIcon cssClass="post_header_icon" />
                                        <div title="Markdown Guide" className="post_header_name">Guide</div>
                                    </div>
                                </div>
                            </div>
                            {
                                showSuccess &&
                                <div className="success_alert">
                                    {showSuccess}
                                    <CancelIcon cssClass="success_alert_cancel" handleEvent={() => setShowSuccess(null)} />
                                </div>
                            }{
                                showError &&
                                <div className="failure_alert">
                                    {showError}
                                    <CancelIcon cssClass="failure_alert_cancel" handleEvent={() => setShowError(null)} />
                                </div>
                            }
                            {
                                activeHeader !== 'guide' &&
                                <div className="post_form">
                                    <PostForm
                                        postForm={postForm}
                                        handleFormField={handleFormField}
                                        handlePublishPost={handlePublishPost}
                                        publishLoading={loading}
                                        showPreview={activeHeader === 'preview' ? true : false}
                                    />
                                </div>
                            }
                            {
                                activeHeader === 'guide' &&
                                <div className="row">
                                    <div className="col-md-8 mx-auto">
                                        <div className="post_guide">
                                            <MarkdownGuide />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {error && <div></div>}
            </div>
        </div>
    )

}

export default withApollo(CreatePost);
