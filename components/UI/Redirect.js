import { useRouter } from 'next/router';
import { useEffect } from 'react';


const Redirect = ({ path }) => {

    const router = useRouter();
    useEffect(() => {
        router.push({
            pathname: path
        })
    }, [])
    return null;
}

export default Redirect;
