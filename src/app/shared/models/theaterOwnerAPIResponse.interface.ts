import { IDistributerList } from "./distributer.entity";
import { IMovie } from "./IMovieCredentials.interface";
import { IMovieRequestDetails } from "./requestMovie.entity";
import IMovieSchedule, { IMovieScheduleWithDetails } from "./schedule.entity";
import { ITheaterOwnerMovieDetails } from "./theaterOwnerCollection.entity";

export interface IGetMovieListOfDistributerDataAPISucessfullResponse {
    message: string;
    data: {
        distributer: IDistributerList,
        movieList: IMovie[];
    };
}

export interface IGetAllMovieRequestsSucessfullResponse {
    message: string;
    data: IMovieRequestDetails[]
}

export interface IGetAllMoviesFromCollectionSucessfullResponse {
    message: string;
    data: ITheaterOwnerMovieDetails[]
}

export interface IAddMovieSchedule {
    message: string;
}

export interface IGetScheduleOn {
    message: string;
    data: IMovieSchedule[]
}

export interface IGetallmoviescheduleSucessfullResponse {
    message: string;
    data: IMovieScheduleWithDetails[];
}