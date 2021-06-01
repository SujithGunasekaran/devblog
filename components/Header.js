import PageLink from '../components/PageLink';

const Header = () => {

    return (
        <div>
            <div className="header_main">
                <div className="header_container">
                    <PageLink href={'/'} as={'/'}>
                        <a className="header_logo">devBlog</a>
                    </PageLink>
                    <div className="header_auth_container">
                        <PageLink href={'/login'} as={'/login'}>
                            <a className="header_auth_signin">Login</a>
                        </PageLink>
                        <PageLink href={'/signup'} as={'/signup'}>
                            <a className="header_auth_create">Create Account</a>
                        </PageLink>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Header;
