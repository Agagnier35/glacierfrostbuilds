import React from 'react';
import useHandleApiError from '../../hooks/useHandleApiError';

const Home = () => {
    useHandleApiError();
    return <div>Home page</div>;
};

export default Home;
