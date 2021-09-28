import { ErrorModel } from '../auth/types';
import * as constants from './constants';
import { movieActionTypes } from './constants';
import { MoviesState } from './types';

const initialState: MoviesState = {
    genres: [],
    selectedMovies: [],
    searchResults: [],
    error: {} as ErrorModel,
    surfaceMessage: null,
    metaData: null,
    totalPages: 0,
    loading: false
}

export function moviesReducer(state = initialState, action: movieActionTypes): MoviesState {
    switch (action.type) {
        case constants.ENTER_MOVIE:
            return {
                ...state,
                loading: true
            }
        case constants.ENTER_MOVIE_SUCCESS:
            return {
                ...state,
                surfaceMessage: action.payload.ok ? state.surfaceMessage : action.payload.message,
                loading: false
            };
        case constants.SEARCH_MOVIES_SUCCESS:
            return {
                ...state,
                surfaceMessage: action.payload.ok ? state.surfaceMessage : action.payload.message,
                metaData: action.payload.ok ? state.metaData : action.payload.metaData,
                searchResults: state.searchResults.concat(action.payload.searchResults),
                totalPages: action.payload.total_pages
            };
        case constants.GET_MOVIES_SUCCESS:
            return {
                ...state,
                genres: action.payload.genres
            };
        case constants.GET_RANDOM_MOVIE:
            return {
                ...state,
                loading: true
            }
        case constants.GET_RANDOM_MOVIE_SUCCESS:
            return {
                ...state,
                selectedMovies: action.payload,
                loading: false
            };
        case constants.GET_RANDOM_MOVIE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case constants.RESET_MESSAGE:
            return {
                ...state,
                surfaceMessage: null,
                metaData: null
            };
        case constants.RESET_SELECTED:
            return {
                ...state,
                selectedMovies: []
            };
        case constants.RESET_SEARCH:
            return {
                ...state,
                searchResults: []
            };
        case constants.UPDATE_MOVIE_WATCHED_SUCCESS:
            return {
                ...state,
                selectedMovies: state.selectedMovies.filter(m => {
                    if (m.movie.id === action.payload.movieId) m.watched = action.payload.watched;
                    return m;
                })
            };
        default: return state;
    }
}