export default interface ITheater {
    _id: string;
    name: string;
    ownerId: string;
    numberOfScreen: number;
    images: string[];
    licence: string;
    isListed: boolean;
}