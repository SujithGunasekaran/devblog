import { useState } from 'react';
import dynamic from 'next/dynamic';
import HeaderTag from '../../components/HeadTag';
import useForm from '../../hooks/useForm';
import withApollo from '../../hoc/withApollo';
import { useCreatePost } from '../../apollo/apolloActions';
import { EditSquareIcon, EyeIcon, InfoCircleIcon, CancelIcon } from '../../components/icons';
import useChangeView from '../../hooks/useChangeView';

const PostForm = dynamic(() => import('../../components/form/postForm'));
const MarkdownGuide = dynamic(() => import('../../components/markdowns/MakrdownGuide'));


const CreatePost = () => {

    const [showSuccess, setShowSuccess] = useState(null);
    const [showError, setShowError] = useState(null);

    // hooks
    const { postForm, handleFormField } = useForm();
    const { currentView, handleChangeView } = useChangeView('edit');

    // query and action
    const [publishPost, { loading, error }] = useCreatePost();

    const handlePublishPost = async (e) => {
        e.preventDefault();
        let publishData = {
            ...postForm
        };
        try {
            await publishPost({ variables: publishData });
            setShowSuccess('Post successfully published');
        }
        catch (err) {
            const parsedError = JSON.parse(JSON.stringify(err));
            if (parsedError?.message.includes('User') ?? '') setShowError(parsedError.message);
            if (parsedError?.message.includes('Response') ?? '') setShowError(parsedError.message);
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
                                    <div className={`post_header_info ${currentView === 'edit' ? 'active' : ''}`} onClick={() => handleChangeView('edit')}>
                                        <EditSquareIcon cssClass="post_header_icon" />
                                        <div title="Edit Post" className="post_header_name">Edit</div>
                                    </div>
                                    <div className={`post_header_info ${currentView === 'preview' ? 'active' : ''}`} onClick={() => handleChangeView('preview')}>
                                        <EyeIcon cssClass="post_header_icon" />
                                        <div title="Preview Post" className="post_header_name">Preview</div>
                                    </div>
                                    <div className={`post_header_info ${currentView === 'guide' ? 'active' : ''}`} onClick={() => handleChangeView('guide')}>
                                        <InfoCircleIcon cssClass="post_header_icon" />
                                        <div title="Markdown Guide" className="post_header_name">Guide</div>
                                    </div>
                                </div>
                            </div>
                            {
                                showSuccess &&
                                <div className="success_alert">
                                    {showSuccess}
                                    <CancelIcon cssClass="alert_cancel" handleEvent={() => setShowSuccess(null)} />
                                </div>
                            }
                            {
                                showError &&
                                <div className="failure_alert">
                                    {showError}
                                    <CancelIcon cssClass="alert_cancel" handleEvent={() => setShowError(null)} />
                                </div>
                            }
                            {
                                currentView !== 'guide' &&
                                <div className="post_form">
                                    <PostForm
                                        postForm={postForm}
                                        handleFormField={handleFormField}
                                        handlePublishPost={handlePublishPost}
                                        publishLoading={loading}
                                        showPreview={currentView === 'preview' ? true : false}
                                    />
                                </div>
                            }
                            {
                                currentView === 'guide' &&
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
