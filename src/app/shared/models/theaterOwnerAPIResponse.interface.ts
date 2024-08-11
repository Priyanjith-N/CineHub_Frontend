import { IDistributerList } from "./distributer.entity";
import { IMovie } from "./IMovieCredentials.interface";

export interface IGetMovieListOfDistributerDataAPISucessfullResponse {
    message: string;
    data: {
        distributer: IDistributerList,
        movieList: IMovie[];
    };
}