export default interface IMovieData {
    name: string;
    about: string;
    language: string[];
    duration: IDuration;
    coverPhoto: string;
    bannerPhoto: string;
    trailer?: string;
    category: string[];
    type: "2D" | "3D" | string;
    cast: IMovieWorkerDetails<string>[];
    crew: IMovieWorkerDetails<string>[];
}

export interface IDuration {
    hours: number;
    minutes: number;
}

export interface IMovieWorkerDetails<T> {
    image: T;
    name: string;
    role: string;
}

export interface IMovie {
    _id: string;
    name: string;
    about: string;
    language: string[];
    duration: IDuration;
    releaseDate: Date | undefined;
    coverPhoto: string;
    bannerPhoto: string;
    trailer: string;
    category: string[];
    type: "2D" | "3D" | string;
    cast: IMovieWorkerDetails<string>[];
    crew: IMovieWorkerDetails<string>[];
    isTakenByDistributer: boolean;
    distributerId: string;
    isListed: boolean;
}