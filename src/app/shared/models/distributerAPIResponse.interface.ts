import { IMovieRequestDetailsForDistributer } from "./requestMovie.entity";

export interface IGetAllMovieRequestsSucessfullResponse {
    message: string;
    data: IMovieRequestDetailsForDistributer[]
}