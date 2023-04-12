import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const withPrivateRoute = (Component) => {
    return () => {
        const router = useRouter();

        useEffect(() => {
            if (typeof window != 'undefined') {
                const username = localStorage.getItem('username');
                if (username === null) {
                    router.push('/');
                }
            }
        }, []);

        return <Component />;
    };
}

export default withPrivateRoute