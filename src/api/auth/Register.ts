import { apiConfig } from '../../app.config';

export const fetchRegister = async (username: string, password: string) => {
    try {
        let data = {
            username: username,
            password: password
        };
        const response = await fetch(`${apiConfig}/v1/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const returnData = await response.json()
        if (returnData.ok) {
            return returnData
        };
        return {
            isError: true,
            data: returnData.detail
        }
    } catch (e) {
        return {
            isError: true
        }
    }
}