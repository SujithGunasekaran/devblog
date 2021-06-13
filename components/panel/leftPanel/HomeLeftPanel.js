import PageLink from '../../PageLink';
import { memo } from 'react';

const HomeLeftPanel = memo(() => {

    return (
        <div>
            <div className="home_left_dev_container">
                <div className="home_left_dev_heading"><span className="highlight">devBlog</span> community has amazing developer</div>
                <div className="home_left_dev_info">Stay up-to-date with Tech info and grow your careers.</div>
                <button className="home_left_dev_login">
                    <PageLink href="/login" as="/login">
                        <a>Login</a>
                    </PageLink>
                </button>
            </div>
        </div>
    )

})

export default HomeLeftPanel;

