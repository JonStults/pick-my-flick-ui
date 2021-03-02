import { CreateMovieModel, MoviesResponseModel, RandomMovieModel } from "./types";

export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const ENTER_MOVIE = 'ENTER_MOVIE';
export const GET_RANDOM_MOVIE = 'GET_RANDOM_MOVIE';
export const GET_RANDOM_MOVIE_SUCCESS = 'GET_RANDOM_MOVIE_SUCCESS';

interface GetMovies {
    type: typeof GET_MOVIES
}

interface GetMoviesSuccess {
    type: typeof GET_MOVIES_SUCCESS,
    payload: MoviesResponseModel
}

interface EnterMovie {
    type: typeof ENTER_MOVIE,
    payload: CreateMovieModel
}

interface GetRandomMovie {
    type: typeof GET_RANDOM_MOVIE,
    payload: number
}

interface GetRandomMovieSuccess {
    type: typeof GET_RANDOM_MOVIE_SUCCESS,
    payload: RandomMovieModel[]
}

export type movieActionTypes = GetMovies
    | GetMoviesSuccess
    | GetRandomMovie
    | GetRandomMovieSuccess
    | EnterMovie;