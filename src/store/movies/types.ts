import { ErrorModel } from "../auth/types";

export interface MoviesState {
    genres: string[];
    selectedMovies: RandomMovieModel[];
    error: ErrorModel,
    surfaceMessage: string | null
}

export interface CreateMovieModel {
    title: string;
    genre: string;
}

export interface MoviesResponseModel {
    genres: string[];
}

export interface RandomMovieModel {
    title: string,
    watched: boolean,
    genre: string
}