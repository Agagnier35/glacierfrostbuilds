import Dictionary from '../../utils/dictionary';

export interface RestError {
    status: number;
    code: string;
    issues: RestIssue[];
}

export interface RestIssue {
    code: string;
    details: string;
    field?: string;
    timestamp: Date;
    meta: Dictionary<any>;
}
