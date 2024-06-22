export interface IOTPVerificationSuccessfullResponse {
    message: string;
}

export interface IOTPVerificationErrorResponse {
    error?: string;
    message?: string;
    errorField?: string;
}

export interface IOTPResendSuccessfullResponse extends IOTPVerificationSuccessfullResponse { }

export interface IOTPResendErrorResponse extends IOTPVerificationErrorResponse { }