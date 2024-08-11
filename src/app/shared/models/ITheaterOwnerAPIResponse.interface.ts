import { IDistributerList } from "./distributer.entity";

export interface IGetDistributerListAPISucessfullResponse {
    message: string;
    data: IDistributerList[];
}