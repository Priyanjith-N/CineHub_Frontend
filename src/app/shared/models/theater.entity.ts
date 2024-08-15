import IImage from "./common.entity";

export default interface ITheater {
    _id: string;
    name: string;
    ownerId: string;
    numberOfScreen: number;
    images: IImage[];
    licence: IImage;
    isListed: boolean;
}