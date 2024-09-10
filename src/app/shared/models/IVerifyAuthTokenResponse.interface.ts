import { IUserProfile } from "./user.entity";

export interface IVerifyAuthTokenSuccessfullResponse {
    message: string;
    data: IUserProfile;
}

export interface IVerifyAuthTokenErrorResponse {
    error?: string;
    message?: string;
}
