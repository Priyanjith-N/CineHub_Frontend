import { ILocation } from "./theater.entity";

export default interface ITheaterCredentials {
    name: string;
    images: string[];
    licence: string;
    location: ILocation;
}

export interface IScreenCredentials {
    name: string;
    capacity: number;
    seatCategory: { category: string, price: number }[];
    seatLayout: boolean[][];
    seatNumberPattern: {
        pattern: "Alphanumerical";
        startFrom: "left" | "right"
    },
    seatCategoryPattern: ({ category: string, price: number } | undefined | null)[];
}