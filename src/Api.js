import { authProvider } from './authProvider.js';

export default class Api {
    async getAll() {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = process.env.REACT_APP_SKILL_API_URL;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }
}
