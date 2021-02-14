import { authProvider } from '../auth-provider/auth-provider';
import APIConfig from '../config/api-config'

export default class Api {
    async getSkills() {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = `${APIConfig.API_URL}/skill`;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }

    async getSkill(id) {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = `${APIConfig.API_URL}/skill/${id}`;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }

    async getUser() {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = `${APIConfig.API_URL}/user/me`;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }

    async saveUser(user) {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = `${APIConfig.API_URL}/user/me`;
        const options = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user)
        }
        const res = await fetch(url, options)
        if (!res.ok) throw new Error(`saveUser with data ${JSON.stringify(user)} resulted in ${res.status}:${res.statusText}`)
    }

    async getFreeTrack() {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = `${APIConfig.API_URL}/freetrack`;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }
}

export const api = new Api()