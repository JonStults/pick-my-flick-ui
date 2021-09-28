import { ErrorModel } from "../auth/types";

export interface MoviesState {
    genres: string[];
    selectedMovies: RandomMovieModel[];
    error: ErrorModel;
    surfaceMessage: string | null;
    metaData: MovieMetaData | null;
    searchResults: SearchResults[];
    totalPages: number;
    loading: boolean;
}

export interface MoviesResponseModel {
    genres: string[];
}

export interface RandomMovieModel {
    watched: boolean;
    movie: {
        title: string;
        watched: boolean;
        genre_ids: string[];
        id: number;
        overview: string;
        poster_path: string;
        release_date: string;
    }
}

export interface MovieMetaData {
    movieId: number
}

export interface SearchResults {
    title: string;
    id: number;
    genre_ids: number[];
    key: number;
    overview: string;
    poster_path: string;
    release_date: string;
    text: string;
    value: number;
}

export interface SearchResponse {
    message: string;
    ok: boolean;
    metaData: MovieMetaData | null;
    searchResults: SearchResults[];
    total_pages: number;
}