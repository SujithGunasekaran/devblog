import Image from 'next/image';
import HeadTag from '../components/HeadTag';
import { useRouter } from 'next/router';
import withApollo from '../hoc/withApollo';
import { useGetUserInfo } from '../apollo/apolloActions';
import { useEffect } from 'react';
import CircularLoading from '../components/UI/CircularLoading';

const Login = () => {

    // queries
    const [getUserInfo, { data, error, loading }] = useGetUserInfo();

    const router = useRouter();

    useEffect(() => {
        getUserInfo();
    }, [])

    const signinWithGoogle = () => {
        router.push({
            pathname: '/google'
        });
    }

    if (data && data.getUserInfo) router.push('/');

    if (loading) return <CircularLoading />

    if ((data && !data.getUserInfo) || error) {
        return (
            <div>
                <HeadTag
                    title="Login"
                    description="Login to devblog"
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <div className="form_main">
                                <div className="form_heading">Welcome to <span className="highlight">devBlog</span></div>
                                <div className="form_intro">Login to devBlog to join in devBlog community</div>
                                <button className="form_google_login" onClick={() => signinWithGoogle()}>
                                    <Image src='/assert/icons/google.png' width={25} height={25} />
                                    <span className="form_google_login_text">Sign In with Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    error && <div></div>
                }
            </div>
        )
    }

    return <div></div>;

}

export default withApollo(Login);
