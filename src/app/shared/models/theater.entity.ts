import IImage from "./common.entity";

export default interface ITheater {
    _id: string;
    name: string;
    ownerId: string;
    numberOfScreen: number;
    images: IImage[];
    location: ILocation;
    licence: IImage;
    isListed: boolean;
}

export interface ILocation {
    lat: number;
    lng: number;
}

export interface IAddressDetails {
    lat: number;
    lng: number;
    address: string;
  }