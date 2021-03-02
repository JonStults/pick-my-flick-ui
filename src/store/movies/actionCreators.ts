import * as constants from './constants';
import { CreateMovieModel, MoviesResponseModel, RandomMovieModel } from './types';

export function getMovies(): constants.movieActionTypes {
    return {
        type: constants.GET_MOVIES
    }
}

export function getMoviesSuccess(data: MoviesResponseModel): constants.movieActionTypes {
    return {
        type: constants.GET_MOVIES_SUCCESS,
        payload: data
    }
}

export function enterMovie(data: CreateMovieModel): constants.movieActionTypes {
    return {
        type: constants.ENTER_MOVIE,
        payload: data
    }
}

export function getRandomMovie(num: number): constants.movieActionTypes {
    return {
        type: constants.GET_RANDOM_MOVIE,
        payload: num
    }
}

export function getRandomMovieSuccess(data: RandomMovieModel[]): constants.movieActionTypes {
    return {
        type: constants.GET_RANDOM_MOVIE_SUCCESS,
        payload: data
    }
}