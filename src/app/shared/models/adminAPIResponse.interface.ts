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

export interface IBlockOrUnblockAPISucessfullResponse {
    message: string;
}

export interface IBlockOrUnblockAPIErrorResponse {
    requiredCredentialsError?: boolean;
    message?: string;
}

export interface INotVerifiedTheaterOwners {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    idProof: string;
    idProofImage: string[];
    OTPVerificationStatus: boolean;
    documentVerificationStatus: string;
    idProofUpdateVerificationStatus: boolean;
    idProofUpdateDocumentImage: string[] | null | undefined;
    isBlocked: boolean;
    role: string;
}

export interface INotVerifiedDistributers {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    licence: string;
    idProof: string;
    idProofImage: string[];
    OTPVerificationStatus: boolean;
    documentVerificationStatus: string;
    licenceUpdateDocument: string | undefined | null;
    licenceUpdateVerificationStatus: boolean;
    idProofUpdateVerificationStatus: boolean;
    idProofUpdateDocumentImage: string[] | undefined | null;
    isBlocked: boolean;
    role: string;
}