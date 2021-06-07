import { useState } from 'react';
import dynamic from 'next/dynamic';
import HeaderTag from '../../components/HeadTag';
import useForm from '../../hooks/useForm';

const PostForm = dynamic(() => import('../../components/form/postForm'), { loading: () => <div>Loading...</div> })
const MarkdownGuide = dynamic(() => import('../../components/MarkdownGuide'), { loading: () => <div>Loading...</div> })

const CreatePost = () => {

    const [activeHeader, setActiveHeader] = useState('edit');

    const { postForm, handleFormField } = useForm();

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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pencil-square post_header_icon" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        <span title="Edit post" className="post_header_name">Edit</span>
                                    </div>
                                    <div className={`post_header_info ${activeHeader === 'preview' ? 'active' : ''}`} onClick={() => setActiveHeader('preview')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-eye-fill post_header_icon" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                        <span title="preview post" className="post_header_name">Preview</span>
                                    </div>
                                    <div className={`post_header_info ${activeHeader === 'guide' ? 'active' : ''}`} onClick={() => setActiveHeader('guide')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-info-circle-fill post_header_icon" viewBox="0 0 16 16">
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                        </svg>
                                        <span title="markdown guide" className="post_header_name">Markdown Guide</span>
                                    </div>
                                </div>
                            </div>
                            {
                                activeHeader !== 'guide' &&
                                <div className="post_form">
                                    <PostForm
                                        postForm={postForm}
                                        handleFormField={handleFormField}
                                        showPreview={activeHeader === 'preview' ? true : false}
                                    />
                                    <button className="post_form_publish_btn">Publish</button>
                                </div>
                            }
                            {
                                activeHeader === 'guide' &&
                                <div className="post_guide">
                                    <MarkdownGuide />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreatePost;
