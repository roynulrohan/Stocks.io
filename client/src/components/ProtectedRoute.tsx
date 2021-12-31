import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ comp: Component, ...rest }: any) => {
    const [profile] = useState(JSON.parse(localStorage.getItem('profile') || '{}'));

    return (
        <Route
            {...rest}
            render={({ props, location }: any) => {
                return profile?.user ? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth',
                            state: { redirect: location },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
