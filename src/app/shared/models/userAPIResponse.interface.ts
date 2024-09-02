import { IMovie } from "./IMovieCredentials.interface";
import { IHomeMovieData } from "./schedule.entity";

export interface IGetDataForHomePageSucessfullResponse {
    message: string;
    data: IHomeMovieData;
}

export interface IGetMovieDetailsSucessfullResponse{
    message: string;
    data: IMovie;
}