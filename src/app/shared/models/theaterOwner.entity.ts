import IImage from "./common.entity";

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