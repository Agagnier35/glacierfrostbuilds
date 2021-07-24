import React, { ReactNode } from 'react';
import { ErrorBoundary as ErrorBoundaryLib } from 'react-error-boundary';
import { RestError } from '../../api/model/rest-error';

export const ErrorFallback = ({ error }: any) => (
    <div>
        <h1>Motherfucker you broke everything.</h1>
        <h4>Contact me on discord: Grago#5082</h4>
        <h6>It's still less broken than idleon :&#93;</h6>
        <details>{error.stack}</details>
    </div>
);

export const RestErrorToast = ({ restError }: { restError: RestError }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Error: {restError?.code ?? 'Unknown'}</div>
        {restError.issues?.map((e) => (
            <div key={e.code}>
                {e.field ? `${e.field}: ` : ''} {e.details}
                {Object.entries(e.meta).map(([metaName, metaValue]) => (
                    <div key={metaName}>
                        {' '}
                        =&gt; {metaName}: {Array.isArray(metaValue) ? metaValue.join(', ') : metaValue}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

const ErrorBoundary = ({ children }: { children: ReactNode }) => (
    <ErrorBoundaryLib FallbackComponent={ErrorFallback}>{children}</ErrorBoundaryLib>
);

export default ErrorBoundary;
