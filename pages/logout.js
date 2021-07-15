import withApollo from '../hoc/withApollo';
import { useLogout } from '../apollo/apolloActions';
import { useRouter } from 'next/router';

const Logout = (props) => {

    const { apollo } = props;

    const { data, error } = useLogout();

    const router = useRouter();

    if (data || error) {
        apollo.resetStore().then(() => {
            router.push('/');
        })
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="form_main">
                            <div className="form_heading">Signing out from <span className="highlight">devBlog</span></div>
                            <div className="form_intro">Please wait while we are signing out...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default withApollo(Logout);
