import { IDistributer } from "./distributer.entity";
import { IMovie } from "./IMovieCredentials.interface";
import ITheaterOwner from "./theaterOwner.entity";

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

export interface IMovieReRequestCredentials {
    profitSharingPerTicket: number | undefined;
    timePeriod: number | undefined;
}

export interface IMovieRequestDetails extends IMovieRequest {
    distributerData: IDistributer,
    movieData: IMovie
}

export interface IMovieRequestDetailsForDistributer extends IMovieRequest {
    theaterOwnerData: ITheaterOwner,
    movieData: IMovie
}