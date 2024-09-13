import { IMovieStreamingDetails } from "./movieStreaming.entity";
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

export interface IAddStreamingSucessfullResponse {
    message: string;
}

export interface IAddStreamingErrorResponse {
    message: string;
    errorField: string;
}

export interface IGetAllStreamingMovieDetailsSucessfullResponse {
    message: string;
    data: IMovieStreamingDetails[];
}