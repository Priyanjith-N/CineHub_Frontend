export interface ILoginSuccessfullResponse {
    message: string;
}

export interface ILoginErrorResponse {
    error?: string;
    message?: string;
    errorField?: string;
}