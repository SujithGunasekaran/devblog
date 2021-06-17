import PageLink from '../../PageLink';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const TagList = dynamic(() => import('../../TagList.js'));

const HomeLeftPanel = memo(() => {

    return (
        <div className="home_left_dev_main">
            <div className="home_left_dev_container">
                <div className="home_left_dev_heading"><span className="highlight">devBlog</span> community has amazing developer</div>
                <div className="home_left_dev_info">Stay up-to-date with Tech info and grow your careers.</div>
                <button className="home_left_dev_login">
                    <PageLink href="/login" as="/login">
                        <a>Login</a>
                    </PageLink>
                </button>
            </div>
            <TagList />
        </div>
    )

})

export default HomeLeftPanel;

