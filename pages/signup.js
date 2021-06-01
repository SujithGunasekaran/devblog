import HeadTag from '../components/HeadTag';


const Signup = () => {

    return (
        <div>
            <HeadTag
                title="Signup"
                description="Create Account in devBlog to join in devBlog community"
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

export default Signup;
