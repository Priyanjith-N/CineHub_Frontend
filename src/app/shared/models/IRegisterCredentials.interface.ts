export interface IUserRegisterCredentials {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ITheaterOwnerRegisterCredentials extends IUserRegisterCredentials {
    IDProof: string,
    IDProofImage: string[]
}