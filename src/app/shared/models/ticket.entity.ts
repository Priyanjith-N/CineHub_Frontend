import { IMovie } from "./IMovieCredentials.interface";
import { ITheaterLocationDecoded } from "./schedule.entity";
import IScreen, { ISeatLayout } from "./screen.entity";
import ITheater from "./theater.entity";

export default interface ITickets {
    _id: string;
    userId: string;
    scheduleId: string;
    paymentIntentId: string;
    date: Date;
    time: string;
    movieId: string;
    theaterId: string;
    screenId: string;
    class: string[];
    paymentStatus: "Successfull" | "Failed" | "Pending" | "Refunded",
    ticketStatus: "Active" | "canceled" | "Succeed" | "Fail",
    purchaseDetails: IPurchaseDetails[],
    totalPaidAmount:number;
    selectedSeatsIdx: ISelectedSeatsIdx[];
    seatDetails: ISeatLayout[];
}

export interface IPurchaseDetails {
    itemName: string;
    quantity: number;
    price: number;
}

export interface ISelectedSeatsIdx {
    rowIdx: number;
    colIdx: number;
}

export interface ITicketDetails extends ITickets {
    movieData: IMovie;
    theaterData: ITheater;
    screenData: IScreen;
}

export interface ITicketDetailsWithLocationDecoded extends Omit<ITicketDetails, 'theaterData'> {
    theaterData: ITheaterLocationDecoded;
}