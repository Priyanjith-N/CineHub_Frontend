export interface IRegisterSuccessfullResponse {
    message: string;
}

export interface IRegisterErrorResponse {
    errorField?: string;
    message?: string;
    error?: string;
}