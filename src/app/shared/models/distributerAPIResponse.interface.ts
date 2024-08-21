import { IMovieRequestDetailsForDistributer } from "./requestMovie.entity";

export interface IGetAllMovieRequestsSucessfullResponse {
    message: string;
    data: IMovieRequestDetailsForDistributer[]
}

export interface IApproveMovieRequestSucessfullResponse {
    message: string;
}

export interface IRejectMovieRequestSucessfullResponse {
    message: string;
}