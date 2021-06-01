import HeadTag from '../components/HeadTag';


const Login = () => {

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;
