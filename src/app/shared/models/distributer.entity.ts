import IImage from "./common.entity";

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