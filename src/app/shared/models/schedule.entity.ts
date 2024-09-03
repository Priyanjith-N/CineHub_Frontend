import { IMovie } from "./IMovieCredentials.interface";
import IScreen, { ISeatLayout } from "./screen.entity";
import ITheater from "./theater.entity";

export default interface IMovieSchedule {
    _id: string;
    date: Date;
    screenId: string;
    startTime: string;
    endTime: string;
    movieId: string;
    seats: (IScheduleSeatLayout | null)[][];
}

export interface IScheduleSeatLayout extends ISeatLayout {
    bookedUserId: string | null;
    isBooked: boolean;
}

export interface IScheduleCredentials {
    date: Date;
    screenId: string;
    startTime: string;
    endTime: string;
    movieId: string;
}

export interface INowPlayingMovies {
    movieData: IMovie;
}

export interface IHomeMovieData {
    nowPlayingMovies: INowPlayingMovies[];
    recommendedMovies: IMovie[];
    upcommingMovies: IMovie[];
}

export interface ISchedulesForMovie {
    scheduleId: string;
    startTime: string;
    endTime: string;
    availableSeats: number;
}

export interface IMovieSchedulesWithTheaterDetails {
    scheduledDate: Date;
    theaterData: ITheater;
    schedules: ISchedulesForMovie[];
}

export interface IMovieSchedulesWithTheaterDetailsWithLocationDecoded {
    scheduledDate: Date;
    theaterData: ITheaterLocationDecoded;
    schedules: ISchedulesForMovie[];
}

export interface ITheaterLocationDecoded extends Omit<ITheater, 'location'> {
    location: {
        city: string;
        address: string;
    }
}

export interface ISelectedShowDetails {
    scheduleId: string;
    theaterName: string;
    scheduledDate: Date;
    time: string;
}

export interface IMovieSchedulesForBooking extends IMovieSchedule {
    movieData: IMovie;
    screenData: IScreen;
    theaterData: ITheater;
}