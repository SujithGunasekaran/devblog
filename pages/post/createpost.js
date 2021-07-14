import { useState } from 'react';
import dynamic from 'next/dynamic';
import HeaderTag from '../../components/HeadTag';
import useForm from '../../hooks/useForm';
import withApollo from '../../hoc/withApollo';
import { useCreatePost } from '../../apollo/apolloActions';
import useChangeView from '../../hooks/useChangeView';
import HeaderTabs from '../../components/post/PostHeaderTabs';
import SuccessMessage from '../../components/UI/SuccessMessage';
import ErrorMessage from '../../components/UI/ErrorMessage';
import { validateInputField } from '../../utils';
import IsUserAuthenticated from '../../hoc/withAuth';

const PostForm = dynamic(() => import('../../components/form/postForm'));
const MarkdownGuide = dynamic(() => import('../../components/markdowns/MakrdownGuide'));


const CreatePost = () => {

    const [showSuccess, setShowSuccess] = useState(null);
    const [showError, setShowError] = useState(null);

    // hooks
    const { postForm, formError, handleFormField, setFormError } = useForm();
    const { currentView, handleChangeView } = useChangeView('edit');

    // query and action
    const [publishPost, { loading, error }] = useCreatePost();

    const handlePublishPost = async (e) => {
        e.preventDefault();
        const isFormValid = validateInputField(['content', 'title'], postForm, setFormError);
        if (isFormValid) {
            let publishData = {
                ...postForm
            };
            try {
                await publishPost({ variables: publishData });
                setShowSuccess('Post successfully published');
            }
            catch (err) {
                setShowError('Error while publishing the post');
            }
            finally {
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
        else {
            const errorMessage = formError.map(name => `${name[0].toUpperCase()}${name.slice(1)}`).join(', ');
            setShowError(errorMessage);
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }


    // UI

    const successMessage = () => (
        <SuccessMessage
            message={showSuccess}
            handleCloseSuccessMessage={() => setShowSuccess(null)}
        />
    );


    const errorMessage = (content) => (
        <ErrorMessage
            message={content ? content : showError}
            handleCloseErrorMessage={() => { setShowError(null); setFormError([]) }}
        />
    );


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
                                <HeaderTabs
                                    currentView={currentView}
                                    handleChangeView={handleChangeView}
                                />
                            </div>
                            {
                                showSuccess &&
                                successMessage()
                            }
                            {
                                showError &&
                                errorMessage()
                            }
                            {
                                formError.length > 0 &&
                                errorMessage(`Please Enter ${formError.map(name => `${name[0].toUpperCase()}${name.slice(1)}`).join(', ')}`)
                            }
                            {
                                currentView !== 'guide' &&
                                <div className="post_form">
                                    <PostForm
                                        postForm={postForm}
                                        handleFormField={handleFormField}
                                        handlePostData={handlePublishPost}
                                        btnText="Publish"
                                        btnLoadingText="Publishing..."
                                        postLoading={loading}
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

export default withApollo(IsUserAuthenticated(CreatePost));
