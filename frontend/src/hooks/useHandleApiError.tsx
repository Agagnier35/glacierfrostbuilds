import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import apiGateway from '../api/apiGateway';

const useHandleApiError = () => {
    const handleError = useErrorHandler();
    useEffect(() => {
        const interceptorId = apiGateway.interceptors.response.use(undefined, (e) => {
            handleError(e);
            return Promise.reject(e);
        });
        return () => {
            apiGateway.interceptors.response.eject(interceptorId);
        };
    }, [handleError]);
};

export default useHandleApiError;
