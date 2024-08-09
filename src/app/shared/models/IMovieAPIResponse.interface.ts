import IMovieData, { IMovie } from "./IMovieCredentials.interface";

export interface IAddMovieErrorResponse {
    error?: string;
    message?: string;
    errorField?: string;
    requiredCredentialsError?: boolean;
}

export interface IGetMoviesSuccessfullResponse {
    message: string;
    data: IMovie[];
}

export interface IListOrUnlistAPISucessfullResponse {
    message: string;
}

export interface IListOrUnlistAPIErrorResponse {
    requiredCredentialsError?: boolean;
    message?: string;
}