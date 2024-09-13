import { IMovie } from "./IMovieCredentials.interface";
import { IHomeMovieData, IMovieSchedulesForBooking, IMovieSchedulesWithTheaterDetails } from "./schedule.entity";
import { ITicketDetails } from "./ticket.entity";

export interface IGetDataForHomePageSucessfullResponse {
    message: string;
    data: IHomeMovieData;
}

export interface IGetMovieDetailsSucessfullResponse{
    message: string;
    data: IMovie;
}

export interface IGetAllShowsForAMovieSucessfullResponse{
    message: string;
    data: IMovieSchedulesWithTheaterDetails[];
}

export interface IGetTheaterScreenLayoutSucessfullResponse{
    message: string;
    data: IMovieSchedulesForBooking;
}

export interface ICreateCheckOutSessionStripeSucessfullResponse {
    message: string;
    sessionId: string;
}

export interface IBookSeatSucessfullResponse {
    message: string;
}

export interface IGetAllActiveTicketsSucessfullResponse {
    message: string;
    data: ITicketDetails[];
}

export interface ICancelTicketSucessfullResponse {
    message: string;
}

export interface IGetAllTransactionListSucessfullResponse {
    message: string;
    data: ITicketDetails[];
}

export interface IGetTicketDetailsSucessfullResponse {
    message: string;
    data: ITicketDetails;
}