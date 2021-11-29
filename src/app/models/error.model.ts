
export interface IErrorModel {
    status?: number;
    message?: string;
    modelState?: string;
    name?: string;
    error?: any;
    [path: string]: any;
}

export interface IErrorResponse {
    code?: string;
    description?: string;
    message?: string;
    name?: string;
    status?: number;
    stack?: string;
}
