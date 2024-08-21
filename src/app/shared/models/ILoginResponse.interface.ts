export interface ILoginSuccessfullResponse {
    message: string;
    token: string;
}

export interface ILoginErrorResponse {
    error?: string;
    message?: string;
    errorField?: string;
}