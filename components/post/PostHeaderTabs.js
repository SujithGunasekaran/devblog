import { EditSquareIcon, EyeIcon, InfoCircleIcon } from '../icons';

const PostHeaderTabs = (props) => {

    const { currentView, handleChangeView } = props;

    return (
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
    )

};

export default PostHeaderTabs;

