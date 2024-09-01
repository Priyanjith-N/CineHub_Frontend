import { IMovie } from "./IMovieCredentials.interface";
import { ISeatLayout } from "./screen.entity";

export default interface IMovieSchedule {
    _id: string;
    date: Date;
    screenId: string;
    startTime: string;
    endTime: string;
    movieId: string;
    seats: (IScheduleSeatLayout | null)[][];
}

export interface IScheduleSeatLayout extends ISeatLayout {
    bookedUserId: string | null;
    isBooked: boolean;
}

export interface IScheduleCredentials {
    date: Date;
    screenId: string;
    startTime: string;
    endTime: string;
    movieId: string;
}

export interface INowPlayingMovies {
    movieData: IMovie;
}

export interface IHomeMovieData {
    nowPlayingMovies: INowPlayingMovies[];
    recommendedMovies: IMovie[];
    upcommingMovies: IMovie[];
}