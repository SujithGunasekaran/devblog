import dynamic from 'next/dynamic';
import { convertFullDateToShort } from '../../utils';

const Markdown = dynamic(() => import('../markdowns/MarkdownRender'));

const FullPostInfo = (props) => {

    const { postData } = props;

    return (
        <div>
            <h1 className="post_id_middle_head_title">{postData?.title ?? ''}</h1>
            <div className="post_id_middle_head_tag_container">
                {
                    postData.tags &&
                    postData.tags.split(',').map((tagName, index) => (
                        <div key={index} className="post_id_middle_head_tag_name">{tagName}</div>
                    ))
                }
            </div>
            <div className="post_id_middle_head_profile_container">
                <div className="post_id_middle_head_profile_subhead">
                    <img src={postData?.user?.userprofile ?? ''} className="post_id_middle_head_profile_image" alt={postData?.user?.username ?? ''} />
                    <div className="post_id_middle_head_profile_name">{postData.user && `${postData.user?.username[0].toUpperCase() ?? ''}${postData.user?.username.slice(1).toLowerCase() ?? ''}`}</div>
                </div>
                <div className="post_id_middle_head_profile_date">{postData.createdAt ? convertFullDateToShort(postData.createdAt) : ''}</div>
            </div>
            <div className="post_id_middle_content_container">
                <Markdown content={postData?.content ?? ''} />
            </div>
        </div>
    )

}


export default FullPostInfo;
