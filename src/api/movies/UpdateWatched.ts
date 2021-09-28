import { apiConfig } from '../../app.config';

export const updatedWatched = async (userId: number, movieId: number, watched: boolean) => {
    try {
        const response = await fetch(`${apiConfig}/v1/userFlick`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, movieId: movieId, watched: watched})
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