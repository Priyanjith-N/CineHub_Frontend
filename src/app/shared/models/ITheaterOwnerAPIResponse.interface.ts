import { IDistributerList } from "./distributer.entity";
import IScreen from "./screen.entity";
import ITheater from "./theater.entity";

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

export interface IGetAllTheatersSucessfullResponse {
    message: string;
    data: ITheater[];
}

export interface IGetTheaterSucessfullResponse {
    message: string;
    data: ITheater;
}

export interface IAddScreenSucessfullResponse {
    message: string;
}

export interface IAddScreenErrorResponse {
    requiredCredentialsError?: boolean;
    error?: string;
    message?: string;
    errorField?: string;
}

export interface IRequestMovieSucessfullResponse {
    message: string;
}

export interface IRequestMovieErrorResponse {
    requiredCredentialsError?: boolean;
    error?: string;
    message?: string;
    errorField?: "AlreadyRequested" | "blocked";
}

export interface IGetAllScreensSucessfullResponse {
    message: string;
    data: IScreen[];
}