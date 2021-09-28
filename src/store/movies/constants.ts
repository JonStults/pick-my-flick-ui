import { ErrorModel } from "../auth/types";
import { MoviesResponseModel, RandomMovieModel, SearchResponse, SearchResults } from "./types";

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
export const RESET_SEARCH = 'RESET_SEARCH';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
export const UPDATE_MOVIE_WATCHED = 'UPDATE_MOVIE_WATCHED';
export const UPDATE_MOVIE_WATCHED_SUCCESS = 'UPDATE_MOVIE_WATCHED_SUCCESS';

interface GetMovies {
    type: typeof GET_MOVIES
}

interface GetMoviesSuccess {
    type: typeof GET_MOVIES_SUCCESS,
    payload: MoviesResponseModel
}

interface EnterMovie {
    type: typeof ENTER_MOVIE,
    payload: SearchResults
}

interface EnterMovieSuccess {
    type: typeof ENTER_MOVIE_SUCCESS,
    payload: SearchResponse
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

interface ResetSearch {
    type: typeof RESET_SEARCH
}

interface SearchMovie {
    type: typeof SEARCH_MOVIES,
    payload: {
        title: string;
        page: number;
    }
}

interface SearchMovieSuccess {
    type: typeof SEARCH_MOVIES_SUCCESS,
    payload: SearchResponse
}

interface UpdateMovieWatched {
    type: typeof UPDATE_MOVIE_WATCHED,
    payload: {
        movieId: number,
        watched: boolean
    }
}

interface UpdateMovieWatchedSuccess {
    type: typeof UPDATE_MOVIE_WATCHED_SUCCESS,
    payload: {
        movieId: number,
        watched: boolean
    }
}

export type movieActionTypes = GetMovies
    | GetMoviesSuccess
    | GetRandomMovie
    | GetRandomMovieSuccess
    | GetRandomMovieError
    | EnterMovie
    | EnterMovieSuccess
    | CreateUserFlick
    | SearchMovie
    | SearchMovieSuccess
    | ResetSearch
    | UpdateMovieWatched
    | UpdateMovieWatchedSuccess
    | ResetSelected
    | ResetMessage;