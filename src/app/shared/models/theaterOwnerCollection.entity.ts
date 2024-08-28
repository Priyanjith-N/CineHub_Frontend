import { IMovie } from "./IMovieCredentials.interface";

export default interface ITheaterOwnerMovieCollection {
    _id: string;
    profitSharingPerTicket: number;
    timePeriod: number;
    movieId: string;
    movieDistributerId: string;
    theaterOwnerId: string;
    movieValidity: Date;
}

export interface ITheaterOwnerMovieDetails extends ITheaterOwnerMovieCollection {
    movieData: IMovie;
}