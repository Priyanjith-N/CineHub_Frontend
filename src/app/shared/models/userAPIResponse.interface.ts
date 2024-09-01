import { IHomeMovieData } from "./schedule.entity";

export interface IGetDataForHomePageSucessfullResponse {
    message: string;
    data: IHomeMovieData;
}