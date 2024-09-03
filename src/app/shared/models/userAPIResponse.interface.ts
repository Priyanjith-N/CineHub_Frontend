import { IMovie } from "./IMovieCredentials.interface";
import { IHomeMovieData, IMovieSchedulesWithTheaterDetails } from "./schedule.entity";

export interface IGetDataForHomePageSucessfullResponse {
    message: string;
    data: IHomeMovieData;
}

export interface IGetMovieDetailsSucessfullResponse{
    message: string;
    data: IMovie;
}

export interface IGetAllShowsForAMovieSucessfullResponse{
    message: string;
    data: IMovieSchedulesWithTheaterDetails[];
}