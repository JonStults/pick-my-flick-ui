import { apiConfig } from '../../app.config';

export const fetchLogin = async (username: string, password: string) => {
    try {
        let data = {
            username: username,
            password: password
        };
        const response = await fetch(`${apiConfig}/v1/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const returnData = await response.json();
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

export const fetchAuth = async (guid: string) => {
    try {
        let data = {
            guid: guid
        };
        const response = await fetch(`${apiConfig}/v1/authcheck`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const returnData = await response;
        if (returnData.ok) {
            return returnData.json()
        };
        return {
            isError: true
        }
    } catch (e) {
        return {
            isError: true
        }
    }
}