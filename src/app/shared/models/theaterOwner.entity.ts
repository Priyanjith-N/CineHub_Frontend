import IImage from "./common.entity";
import ITheater from "./theater.entity";

export default interface ITheaterOwner {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    idProof: string;
    idProofImage: IImage[];
    OTPVerificationStatus: boolean;
    documentVerificationStatus: string;
    isBlocked: boolean;
}

export interface IAllTheaterWithScreen {
    theaterData: ITheater;
    screens: {
        _id: string;
        name: string;
    }[]
}

export interface ITheaterOwnerDashboardData {
    totalActiveMovieCount: number;
    totalOverallBooking: number;
    totalPendingRequest: number;
    allTheatersWithScreens: IAllTheaterWithScreen[]
}

export interface IGraphData {
    revenue: number;
    day?: number;
    month?: string;
    year: number;
}