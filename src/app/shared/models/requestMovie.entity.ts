import { IDistributer } from "./distributer.entity";
import { IMovie } from "./IMovieCredentials.interface";

export interface IMovieRequest {
    _id: string;
    profitSharingPerTicket: number;
    timePeriod: number;
    requestedMovieId: string;
    requestedMovieDistributerId: string;
    theaterOwnerId: string;
    requestStatus: "Pending" | "Approved" | "Rejected";
    date: Date;
}

export default interface IMovieRequestCredentials {
    profitSharingPerTicket: number;
    timePeriod: number;
    requestedMovieId: string;
    requestedMovieDistributerId: string;
}

export interface IMovieRequestDetails extends IMovieRequest {
    distributerData: IDistributer,
    movieData: IMovie
}