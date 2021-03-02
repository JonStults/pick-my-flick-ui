import { apiConfig } from '../../app.config';

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

export const postMovie = async (title: string, genre: string) => {
    try {
        const response = await fetch(`${apiConfig}/v1/movies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, genre: genre})
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

export const fetchRandomMovie = async (num: number) => {
    try {
        const response = await fetch(`${apiConfig}/v1/random?number=${num}`);
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