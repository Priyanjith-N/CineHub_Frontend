export interface IOTPVerificationSuccessfullResponse {
    message: string;
}

export interface IOTPVerificationErrorResponse {
    error?: string;
    message?: string;
    errorField?: string;
}