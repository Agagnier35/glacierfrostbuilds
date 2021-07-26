import axios from 'axios';
import { toast } from 'react-toastify';
import { toastError } from '../hooks/errorHandler';
import { RestError } from './model/rest-error';

const isLocal = window.location.hostname === 'localhost';

export const serverUrl = isLocal ? 'http://localhost:8080' : window.location.protocol + '//' + window.location.hostname;
const baseURL = serverUrl + '/api/v1';

console.log(`API Url: ${baseURL}`);
const apiGateway = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', Accept: ['application/json', 'plain/text'] },
    withCredentials: true,
});
apiGateway.interceptors.response.use(({ data }) => data);

apiGateway.interceptors.response.use(undefined, (error) => {
    if (error.response) {
        let restError: RestError | null = null;
        if (error.response.data) {
            restError = error.response.data as RestError;
        } else if (error.response.status === 401) {
            if ((error.request.responseURL as string).endsWith('/user')) {
                return Promise.reject({ ...error, wasAPIError: true });
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
        }
        if (restError) {
            toastError(restError);
        }
        return Promise.reject({ ...error, wasAPIError: true });
    } else if (error.isAxiosError) {
        toast.error('Server unreacheable');
        return Promise.reject({ ...error, wasAPIError: true });
    }
    return Promise.reject(error);
});

export default apiGateway;
