export default interface IAllPossiableErrorResponse {
    message: string;
    errorField?: string;
    requiredCredentialsError?: boolean;
    internalServerError?: boolean;
}