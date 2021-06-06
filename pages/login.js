import Image from 'next/image';
import HeadTag from '../components/HeadTag';
import { useRouter } from 'next/router';

const Login = () => {

    const router = useRouter();

    const signinWithGoogle = () => {
        router.push({
            pathname: '/google'
        });
    }

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
                            <div className="form_heading">Welcome to devBlog</div>
                            <div className="form_intro">Login to devBlog to join in devBlog community</div>
                            <button className="form_google_login" onClick={() => signinWithGoogle()}>
                                <Image src='/assert/icons/google.png' width={25} height={25} />
                                <span className="form_google_login_text">Sign In with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;
