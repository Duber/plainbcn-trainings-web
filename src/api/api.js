import { authProvider } from '../auth-provider/auth-provider';
import APIConfig from '../config/api-config'

export default class Api {
    async getSkills() {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = APIConfig.SKILL_API_URL;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }

    async evaluateSkill(skillId, isAccomplished) {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = `${APIConfig.SKILL_API_URL}/${skillId}`;
        const options = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ isAccomplished: isAccomplished })
        }
        const res = await fetch(url, options)
        if (!res.ok) throw new Error(`likeFreeTrack with id ${skillId} resulted in ${res.status}:${res.statusText}`)
    }

    async getFreeTrack() {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = APIConfig.FREETRACK_API_URL;
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return fetch(url, options).then((result) => result.json())
    }

    async likeFreeTrack(id) {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = `${APIConfig.FREETRACK_API_URL}/like`;
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: id })
        }
        const res = await fetch(url, options)
        if (!res.ok) throw new Error(`likeFreeTrack with id ${id} resulted in ${res.status}:${res.statusText}`)
    }

    async unlikeFreeTrack(id) {
        const tokenResponse = await authProvider.getAccessToken()
        const token = tokenResponse.accessToken
        const url = `${APIConfig.FREETRACK_API_URL}/unlike`;
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id: id })
        }
        const res = await fetch(url, options)
        if (!res.ok) throw new Error(`unlikeFreeTrack with id ${id} resulted in ${res.status}:${res.statusText}`)
    }
}
