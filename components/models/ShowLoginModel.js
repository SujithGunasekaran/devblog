import { CancelIcon } from './../icons';
import { memo } from 'react';
import PageLink from '../PageLink';

const ShowLoginModel = memo((props) => {

    const { closeModel } = props;

    return (
        <div>
            <div className="model_container">
                <div className="model_head_container model_show_border">
                    <div className="model_head_heading">Log in to continue</div>
                    <CancelIcon cssClass={"model_head_cancel_icon"} handleEvent={closeModel} />
                </div>
                <div className="model_body_container">
                    <div className="model_body_logo">devBlog</div>
                    <div className="model_body_content">stay up-to-date and gain knowledge in devBlog community</div>
                    <PageLink href={'/login'} as={'/login'}>
                        <button className="model_body_btn">Login</button>
                    </PageLink>
                </div>
            </div>
        </div>
    )

})

export default ShowLoginModel;
