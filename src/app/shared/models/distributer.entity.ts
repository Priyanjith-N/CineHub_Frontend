import IImage from "./common.entity";
import { IMovie } from "./IMovieCredentials.interface";

export interface IDistributerList {
    _id: string;
    name: string;
    distributedMoviesList: string[];
}

export interface IDistributer {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    licence: IImage;
    idProof: string;
    idProofImage: IImage[];
    OTPVerificationStatus: boolean;
    documentVerificationStatus: string;
    distributedMoviesList: string[],
    isBlocked: boolean;
}

export interface IMovieDeatilsWithRevenue {
    totalTicketSold: number;
    revenue: number;
    movieData: IMovie;
}

export interface IDistributerDashboardData {
    totalDistributedMovieCount: number;
    totalMoviesStreamingCount: number;
    totalNewPendingRequestCount: number;
    movieDetailsWithRevenue: IMovieDeatilsWithRevenue[];
}

export interface IGetDistributerDashboardDataSuccessfullResponse {
    message: string;
    data: IDistributerDashboardData;
}