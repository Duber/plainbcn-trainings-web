import { authProvider } from './authProvider';

export default class Api {
    async getAll() {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = 'http://localhost:3001/api/skills';
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }
}
