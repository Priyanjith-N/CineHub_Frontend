export interface IRetriveDataSucessfullAPIResponse<T> {
    message: string;
    data: T[]
}

export interface IUserData {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password?: string;
    OTPVerification: boolean;
    isBlocked: boolean;
}

export interface ITheaterOwnerData {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password?: string;
    idProof: string;
    idProofImage: string[];
    OTPVerificationStatus: boolean;
    documentVerificationStatus: boolean;
    idProofUpdateVerificationStatus: boolean;
    idProofUpdateDocumentImage: string[] | null | undefined;
    isBlocked: boolean;
}

export interface IDistributerData {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password?: string;
    licence: string;
    idProof: string;
    idProofImage: string[];
    OTPVerificationStatus: boolean;
    documentVerificationStatus: boolean;
    licenceUpdateDocument: string | undefined | null
    licenceUpdateVerificationStatus: boolean;
    idProofUpdateVerificationStatus: boolean;
    idProofUpdateDocumentImage: string[] | undefined | null;
    isBlocked: boolean;
}