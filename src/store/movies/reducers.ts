import * as constants from './constants';
import { movieActionTypes } from './constants';
import { MoviesState } from './types';

const initialState: MoviesState = {
    genres: [],
    selectedMovies: []
}

export function moviesReducer(state = initialState, action: movieActionTypes): MoviesState {
    switch (action.type) {
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
        default: return state;
    }
}