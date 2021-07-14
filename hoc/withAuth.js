import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetUserInfo } from '../apollo/apolloActions';
import CircularLoading from '../components/UI/CircularLoading';
import Redirect from '../components/UI/Redirect';

const IsUserAuthenticated = (Component) => {

    const newComponent = () => {

        const [getUserInfo, { data, error }] = useGetUserInfo();

        useEffect(() => {
            getUserInfo();
        }, [])

        if (data && !data.getUserInfo || error) return <Redirect path="/login" />

        if (data && data.getUserInfo) return <Component />

        return (
            <CircularLoading />
        )

    }

    return newComponent;

}

export default IsUserAuthenticated;
