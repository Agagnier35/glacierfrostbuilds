import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { toast } from 'react-toastify';
import apiGateway from '../api/apiGateway';
import { RestError } from '../api/model/rest-error';
import { RestErrorToast } from '../components/error-boundary';

const useHandleApiError = () => {
    const handleError = useErrorHandler();
    useEffect(() => {
        const interceptorId = apiGateway.interceptors.response.use(undefined, (error) => {
            if (error?.response?.data) {
                const restError = error.response.data as RestError;
                toast.error(<RestErrorToast restError={restError} />);
                return Promise.reject();
            } else if (error.isAxiosError) {
                toast.error('Server unreacheable');
                return Promise.reject();
            } else {
                toast('Unhandled JS error' + error);
                handleError(error);
            }
        });
        return () => {
            apiGateway.interceptors.response.eject(interceptorId);
        };
    }, [handleError]);
};

export default useHandleApiError;
