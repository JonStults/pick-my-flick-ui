import { ErrorModel } from '../auth/types';
import * as constants from './constants';
import { movieActionTypes } from './constants';
import { MoviesState } from './types';

const initialState: MoviesState = {
    genres: [],
    selectedMovies: [],
    error: {} as ErrorModel,
    surfaceMessage: null,
    metaData: null
}

export function moviesReducer(state = initialState, action: movieActionTypes): MoviesState {
    switch (action.type) {
        case constants.ENTER_MOVIE_SUCCESS:
            return {
                ...state,
                surfaceMessage: action.payload.ok ? state.surfaceMessage : action.payload.message,
                metaData: action.payload.ok ? state.metaData : action.payload.metaData
            };
        case constants.GET_MOVIES_SUCCESS:
            return {
                ...state,
                genres: action.payload.genres
            };
        case constants.GET_RANDOM_MOVIE_SUCCESS:
            return {
                ...state,
                selectedMovies: action.payload
            };
        case constants.GET_RANDOM_MOVIE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case constants.RESET_MESSAGE:
            return {
                ...state,
                surfaceMessage: null,
                metaData: null
            };
        default: return state;
    }
}