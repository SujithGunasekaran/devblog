import React from 'react';
import { GithubIcon } from './icons';
import PageLink from './PageLink';

const Footer = () => {
    return (
        <React.Fragment>
            <div className="footer_main">
                <div className="footer_info_container">
                    <PageLink href={'https://github.com/SujithGunasekaran'} as={'https://github.com/SujithGunasekaran'}>
                        <a target='_blank' rel='noreference'>
                            <GithubIcon cssClass={'github_icon'} />
                        </a>
                    </PageLink>
                    <div className="name">devBlog Community</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Footer;
