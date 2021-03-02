export interface MoviesState {
    genres: string[];
    selectedMovies: RandomMovieModel[];
}

export interface CreateMovieModel {
    title: string;
    genre: string;
}

export interface MoviesResponseModel {
    genres: string[];
}

export interface RandomMovieModel {
    title: string,
    watched: boolean,
    genre: string
}