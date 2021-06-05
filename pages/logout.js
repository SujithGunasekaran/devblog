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

    return <div>Signing out..</div>

}

export default withApollo(Logout);
