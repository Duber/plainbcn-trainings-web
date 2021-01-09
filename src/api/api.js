import { authProvider } from '../auth-provider/auth-provider.js';

export default class Api {
    async getSkills() {
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

    async getFreeTrack() {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = process.env.REACT_APP_FREETRACK_API_URL;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }
}
