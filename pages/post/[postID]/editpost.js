import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import withApollo from "../../../hoc/withApollo";
import HeaderTag from "../../../components/HeadTag";
import HeaderTabs from '../../../components/post/PostHeaderTabs';
import useForm from '../../../hooks/useForm';
import useChangeView from '../../../hooks/useChangeView';
import { useGetPostById, useEditPostInfo } from '../../../apollo/apolloActions';
import SuccessMessage from '../../../components/UI/SuccessMessage';
import ErrorMessage from '../../../components/UI/ErrorMessage';
import { validateInputField } from '../../../utils';
import IsUserAuthenticated from '../../../hoc/withAuth';

const PostForm = dynamic(() => import('../../../components/form/postForm'));
const MarkdownGuide = dynamic(() => import('../../../components/markdowns/MakrdownGuide/index.js'));

const EditPost = () => {

    // states
    const [showSuccess, setShowSuccess] = useState(null);
    const [showError, setShowError] = useState(null);

    // hooks
    const { postForm, formError, handleFormField, setPostInfo, setFormError } = useForm();
    const { currentView, handleChangeView } = useChangeView('edit');

    // router
    const router = useRouter();
    const postid = router.query.postID;

    // query and mutation
    const { data: post, error: postError } = useGetPostById(postid);
    const [editPostInfo, { loading: editLoading, error: editError }] = useEditPostInfo();

    // useEffect
    useEffect(() => {
        if (post && Object.keys(postForm).length === 0) {
            const { postInfo } = post.getPostById;
            const { content, title, tags } = postInfo;
            setPostInfo({ content, title, tags })
        }
    }, [post])


    // handle edit post
    const handleEditPost = async (e) => {
        e.preventDefault();
        const isFormValid = validateInputField(['content', 'title'], postForm, setFormError);
        if (isFormValid) {
            let publishData = {
                ...postForm,
                postid: postid,
            };
            try {
                await editPostInfo({ variables: publishData });
                setShowSuccess('Post successfully updated');
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
        else {
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
                title="Edit Post"
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
                                        handlePostData={handleEditPost}
                                        postLoading={editLoading}
                                        btnText="Edit"
                                        btnLoadingText="Editing..."
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
                {(postError || editError) && <div></div>}
            </div>
        </div>
    )

};

export default withApollo(IsUserAuthenticated(EditPost));

