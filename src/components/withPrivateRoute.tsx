import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const withPrivateRoute = (Component) => {
    return () => {
        const router = useRouter();

        const [component, setComponent] = useState(null);

        useEffect(() => {
            if (localStorage.getItem('username')) {
                setComponent(Component);

                return;
            }

            router.push('/');
        }, []);

        return component;
    };
}

export default withPrivateRoute