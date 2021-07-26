import { toast } from 'react-toastify';
import { RestError } from '../api/model/rest-error';
import { RestErrorToast } from '../components/error-boundary';

export const toastError = (restError: RestError) => {
    toast.error(<RestErrorToast restError={restError} />);
};
