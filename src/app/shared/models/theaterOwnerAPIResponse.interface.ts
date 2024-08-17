import { IDistributerList } from "./distributer.entity";
import { IMovie } from "./IMovieCredentials.interface";
import { IMovieRequestDetails } from "./requestMovie.entity";

export interface IGetMovieListOfDistributerDataAPISucessfullResponse {
    message: string;
    data: {
        distributer: IDistributerList,
        movieList: IMovie[];
    };
}

export interface IGetAllMovieRequestsSucessfullResponse {
    message: string;
    data: IMovieRequestDetails[]
}