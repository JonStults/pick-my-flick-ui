import { ErrorModel } from '../auth/types';
import * as constants from './constants';
import { CreateMovieModel, MovieMetaData, MoviesResponseModel, RandomMovieModel } from './types';

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

export function enterMovieSuccess(data: {message: string, ok: boolean, metaData: MovieMetaData | null}): constants.movieActionTypes {
    return {
        type: constants.ENTER_MOVIE_SUCCESS,
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

export function getRandomMovieError(data: ErrorModel): constants.movieActionTypes {
    return {
        type: constants.GET_RANDOM_MOVIE_ERROR,
        payload: data
    }
}

export function resetMessage(): constants.movieActionTypes {
    return {
        type: constants.RESET_MESSAGE
    }
}

export function createUserFlick(userId: number, movieId: number): constants.movieActionTypes {
    return {
        type: constants.CREATE_USER_FLICK,
        payload: {
            userId: userId,
            movieId: movieId
        }
    }
}

export function resetSelected(): constants.movieActionTypes {
    return {
        type: constants.RESET_SELECTED
    }
}