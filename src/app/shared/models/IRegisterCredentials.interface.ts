export interface IUserRegisterCredentials {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ITheaterOwnerRegisterCredentials {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    IDProof: string,
    IDProofImage: string[]
}

export interface IDistributerRegisterCredentials {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    IDProof: string;
    IDProofImage: string[]
    licence: string;
}