import { IDistributerList } from "./distributer.entity";

export interface IGetDistributerListAPISucessfullResponse {
    message: string;
    data: IDistributerList[];
}

export interface IAddTheaterSucessfullResponse {
    message: string;
}

export interface IAddTheaterErrorResponse {
    requiredCredentialsError?: boolean;
    error?: string;
    message?: string;
    errorField?: string;
}