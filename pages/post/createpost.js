import { useState } from 'react';
import dynamic from 'next/dynamic';
import HeaderTag from '../../components/HeadTag';
import useForm from '../../hooks/useForm';

const PostForm = dynamic(() => import('../../components/form/postForm'), { loading: () => <div>Loading...</div> });
const MarkdownGuide = dynamic(() => import('../../components/MakrdownGuide'), { loading: () => <div>Loading...</div> });
const { EditSquareIcon, EyeIcon, InfoCircleIcon } = {
    EditSquareIcon: dynamic(() => import('../../components/icons').then(component => component.EditSquareIcon), { loading: () => <div></div> }),
    EyeIcon: dynamic(() => import('../../components/icons').then(component => component.EyeIcon), { loading: () => <div></div> }),
    InfoCircleIcon: dynamic(() => import('../../components/icons').then(component => component.InfoCircleIcon), { loading: () => <div></div> }),
}


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
            </div>
        </div>
    )

}

export default CreatePost;
