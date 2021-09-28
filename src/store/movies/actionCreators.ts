import { ErrorModel } from '../auth/types';
import * as constants from './constants';
import { MoviesResponseModel, RandomMovieModel, SearchResponse, SearchResults } from './types';

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

export function enterMovie(data: SearchResults): constants.movieActionTypes {
    return {
        type: constants.ENTER_MOVIE,
        payload: data
    }
}

export function enterMovieSuccess(data: SearchResponse): constants.movieActionTypes {
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

export function resetSearch(): constants.movieActionTypes {
    return {
        type: constants.RESET_SEARCH
    }
}

export function searchMovies(title: string, page: number): constants.movieActionTypes {
    return {
        type: constants.SEARCH_MOVIES,
        payload: {
            title: title,
            page: page
        }
    }
}

export function searchMoviesSuccess(data: SearchResponse): constants.movieActionTypes {
    return {
        type: constants.SEARCH_MOVIES_SUCCESS,
        payload: data
    }
}

export function updateMovieWatched(movieId: number, watched: boolean): constants.movieActionTypes {
    return {
        type: constants.UPDATE_MOVIE_WATCHED,
        payload: {
            movieId: movieId,
            watched: watched
        }
    }
}

export function updateMovieWatchedSuccess(movieId: number, watched: boolean): constants.movieActionTypes {
    return {
        type: constants.UPDATE_MOVIE_WATCHED_SUCCESS,
        payload: {
            movieId: movieId,
            watched: watched
        }
    }
}