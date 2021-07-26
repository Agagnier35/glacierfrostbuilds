import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import BuildRepository from '../../api/repository/buildRepository';
import { RestErrorToast } from '../../components/error-boundary';

const Home = () => {
    const [buildCount, setBuildCount] = useState(0);

    const location = useLocation<{ redirected: boolean }>();

    useEffect(() => {
        if (location?.state?.redirected) {
            toast.error(
                <RestErrorToast
                    restError={{
                        status: 401,
                        code: 'You must be logged in to do this',
                        issues: [],
                    }}
                />,
            );
        }
    }, [location]);

    useEffect(() => {
        BuildRepository.getBuildCount().then(setBuildCount);
    }, []);

    return (
        <div className="p-5 m-3 bg-primary rounded-3">
            <h1>Currently hosting {buildCount} builds!</h1>
        </div>
    );
};

export default Home;
