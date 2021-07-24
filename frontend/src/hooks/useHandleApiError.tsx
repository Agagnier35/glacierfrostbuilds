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
            if (error?.response) {
                let restError: RestError | null = null;
                if (error.response.data) {
                    restError = error.response.data as RestError;
                } else if (error.response.status === 401) {
                    if ((error.request.responseURL as string).endsWith('/user')) {
                        return Promise.reject();
                    }
                    restError = {
                        status: 401,
                        code: 'You must be logged in to do this',
                        issues: [],
                    };
                } else if (error.response.status === 403) {
                    restError = {
                        status: 403,
                        code: 'You are not authorized to do this',
                        issues: [],
                    };
                } else {
                    restError = {
                        status: error.response.status,
                        code: `The dev forgot to handle => ${error.response.status}`,
                        issues: [
                            {
                                code: 'UnknownRESTError',
                                details: 'AKA, you fucked up terribly',
                                meta: {},
                                timestamp: new Date(),
                            },
                        ],
                    };
                }
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
