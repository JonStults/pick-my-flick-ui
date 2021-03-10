import { ErrorModel } from "../auth/types";
import { CreateMovieModel, MovieMetaData, MoviesResponseModel, RandomMovieModel } from "./types";

export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const ENTER_MOVIE = 'ENTER_MOVIE';
export const ENTER_MOVIE_SUCCESS = 'ENTER_MOVIE_SUCCESS';
export const GET_RANDOM_MOVIE = 'GET_RANDOM_MOVIE';
export const GET_RANDOM_MOVIE_SUCCESS = 'GET_RANDOM_MOVIE_SUCCESS';
export const GET_RANDOM_MOVIE_ERROR = 'GET_RANDOM_MOVIE_ERROR';
export const RESET_MESSAGE = 'RESET_MESSAGE';
export const CREATE_USER_FLICK = 'CREATE_USER_FLICK';
export const RESET_SELECTED = 'RESET_SELECTED';

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

interface EnterMovieSuccess {
    type: typeof ENTER_MOVIE_SUCCESS,
    payload: {
        message: string,
        ok: boolean,
        metaData: MovieMetaData | null
    }
}

interface GetRandomMovie {
    type: typeof GET_RANDOM_MOVIE,
    payload: number
}

interface GetRandomMovieSuccess {
    type: typeof GET_RANDOM_MOVIE_SUCCESS,
    payload: RandomMovieModel[]
}

interface GetRandomMovieError {
    type: typeof GET_RANDOM_MOVIE_ERROR,
    payload: ErrorModel
}

interface ResetMessage {
    type: typeof RESET_MESSAGE
}

interface CreateUserFlick {
    type: typeof CREATE_USER_FLICK,
    payload: {
        userId: number,
        movieId: number
    }
}

interface ResetSelected {
    type: typeof RESET_SELECTED
}

export type movieActionTypes = GetMovies
    | GetMoviesSuccess
    | GetRandomMovie
    | GetRandomMovieSuccess
    | GetRandomMovieError
    | EnterMovie
    | EnterMovieSuccess
    | CreateUserFlick
    | ResetSelected
    | ResetMessage;