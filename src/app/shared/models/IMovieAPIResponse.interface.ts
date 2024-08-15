import IMovieData, { IMovie } from "./IMovieCredentials.interface";

export interface IAddEditMovieErrorResponse {
    error?: string;
    message?: string;
    errorField?: string;
    requiredCredentialsError?: boolean;
}

export interface IGetMoviesSuccessfullResponse {
    message: string;
    data: IMovie[];
}

export interface IGetMovieSuccessfullResponse {
    message: string;
    data: IMovie;
}

export interface IListOrUnlistAPISucessfullResponse {
    message: string;
}

export interface IListOrUnlistAPIErrorResponse {
    requiredCredentialsError?: boolean;
    message?: string;
}

export interface IGetAllAvaliableMovieDataSuccessfullResponse {
    message: string;
    data: IMovie[];
}

export interface IDistributeMovieSuccessfullResponse {
    message: string
}

export interface IDistributeMovieErrorResponse {
    error?: string;
    errorField?: string;
    requiredCredentialsError?: boolean;
    message?: string;
}

export interface IEditProfitSharingSuccessfullResponse {
    message: string
}

export interface IEditProfitSharingErrorResponse {
    error?: string;
    errorField?: string;
    requiredCredentialsError?: boolean;
    message?: string;
}

export interface IMyDistributedMoviesSuccessfullResponse {
    message: string;
    data: IMovie[];
}

export interface IMyDistributedMoviesErrorResponse {
    error?: string;
    errorField?: string;
    requiredCredentialsError?: boolean;
    message?: string;
}