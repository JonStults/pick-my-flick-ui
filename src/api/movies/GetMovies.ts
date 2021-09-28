import { apiConfig } from '../../app.config';
import { SearchResults } from '../../store/movies/types';

export const fetchMovies = async () => {
    try {
        const response = await fetch(`${apiConfig}/v1/movies`);
        const returnData = await response.json();
        if (response.ok) {
            return returnData;
        }
        return {
            isError: true
        }
    } catch (e) {
        return {
            isError: true
        }
    }
}

export const fetchGenres = async () => {
    try {
        const response = await fetch(`${apiConfig}/v1/genres`);
        const returnData = await response.json();
        if (response.ok) {
            return returnData;
        }
        return {
            isError: true
        }
    } catch (e) {
        return {
            isError: true
        }
    }
}

export const postMovie = async (data: SearchResults, userId: number) => {
    try {
        const response = await fetch(`${apiConfig}/v1/movies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data, userId: userId})
        });
        const returnData = await response.json();
        if (response.ok) {
            return returnData;
        }
        return {
            isError: true
        }
    } catch (e) {
        return {
            isError: true
        }
    }
}

export const fetchRandomMovie = async (num: number, userId: number) => {
    try {
        const response = await fetch(`${apiConfig}/v1/random?number=${num}&userId=${userId}`);
        const returnData = await response.json();
        if (response.ok) {
            return returnData;
        }
        return {
            isError: true,
            message: returnData.detail
        }
    } catch (e) {
        return {
            isError: true
        }
    }
}

export const postUserFlick = async (userId: number, movieId: number) => {
    try {
        const response = await fetch(`${apiConfig}/v1/userFlick`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, movieId: movieId})
        });
        const returnData = await response.json();
        if (response.ok) {
            return returnData;
        }
        return {
            isError: true
        }
    } catch (e) {
        return {
            isError: true
        }
    }
}