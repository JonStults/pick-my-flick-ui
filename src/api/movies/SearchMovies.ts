import { apiConfig } from '../../app.config';

export const searchMovies = async (title: string, page: number) => {
    try {
        const response = await fetch(`${apiConfig}/v1/searchMovies?title=${title}&page=${page}`);
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
