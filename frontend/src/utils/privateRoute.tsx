import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './authProvider';

const PrivateRoute = ({ children, ...rest }: any) => {
    const { auth } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={() => {
                return auth ? children : <Redirect to={{ pathname: '/', state: { redirected: true } }} />;
            }}
        />
    );
};
export default PrivateRoute;
