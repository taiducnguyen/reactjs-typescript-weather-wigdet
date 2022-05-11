
export type IErrorModel = {
    status?: number;
    message?: string;
    modelState?: string;
    name?: string;
    [path: string]: any;
}

export type IErrorResponse = {
    code?: string;
    description?: string;
    message?: string;
    name?: string;
    status?: number;
    stack?: string;
}
