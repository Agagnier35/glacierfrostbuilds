import React, { ReactNode } from 'react';
import { ErrorBoundary as ErrorBoundaryLib } from 'react-error-boundary';
import { toast } from 'react-toastify';
import { RestError } from '../../api/model/rest-error';

const ErrorFallback = ({ error }: any) => (
    <div>
        <h1>Motherfucker you broke everything.</h1>
        <h4>Contact me on discord: Grago#5082</h4>
        <h6>It's still less broken than idleon :&#93;</h6>
        <details>{error.stack}</details>
    </div>
);

const ErrorBoundary = ({ children }: { children: ReactNode }) => {
    const myErrorHandler = (error: any) => {
        if (error.response.data) {
            const restError = error.response.data as RestError;
            toast.error(
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>Error {restError.code}</div>
                    {restError.errors.map((e) => (
                        <div key={e.code}>{e.details}</div>
                    ))}
                </div>,
            );
        }
    };

    return (
        <ErrorBoundaryLib FallbackComponent={ErrorFallback} onError={myErrorHandler}>
            {children}
        </ErrorBoundaryLib>
    );
};

export default ErrorBoundary;
