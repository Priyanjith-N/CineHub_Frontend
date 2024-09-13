import { IMovie } from "./IMovieCredentials.interface";

export default interface IMovieStreaming {
    _id: string;
    movieId: string;
    rentAmount: number;
    rentalPeriod: number;
    buyAmount: number;
}

export interface IMovieStreamingCredentials {
    movieId: string;
    rentAmount: number;
    rentalPeriod: number;
    buyAmount: number;
}

export interface IMovieStreamingDetails extends IMovieStreaming {
    movieData: IMovie;
}