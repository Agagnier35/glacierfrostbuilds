export interface RestError {
    status: number;
    code: string;
    errors: RestIssue[];
}

export interface RestIssue {
    code: string;
    details: string;
    timestamp: Date;
}
