import { useState } from 'react';
import dynamic from 'next/dynamic';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import HeaderTag from '../../components/HeadTag';
import useForm from '../../hooks/useForm';

const PostForm = dynamic(() => import('../../components/form/postForm'), { loading: () => <div>Loading...</div> })

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
                                        <EditRoundedIcon className="post_header_icon" />
                                        <span className="post_header_name">Edit</span>
                                    </div>
                                    <div className={`post_header_info ${activeHeader === 'preview' ? 'active' : ''}`} onClick={() => setActiveHeader('preview')}>
                                        <VisibilityRoundedIcon className="post_header_icon" />
                                        <span className="post_header_name">Preview</span>
                                    </div>
                                </div>
                            </div>
                            <div className="post_form">
                                <PostForm
                                    postForm={postForm}
                                    handleFormField={handleFormField}
                                    showPreview={activeHeader === 'preview' ? true : false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreatePost;
