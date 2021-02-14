import { api } from '../api/api'

export default class FreeTrackService {
    async getAll() {
        const [fts, user] = await Promise.all([api.getFreeTrack(), api.getUser()])
        fts.map(ft => {
            return {
                ...ft,
                liked: user.freetrack.likes.includes(ft.id)
            }
        })
        return fts
    }

    async Like(id) {
        const user = await api.getUser()
        user.freetrack.likes = user.freetrack.likes.filter(ft => ft !== id)
        user.freetrack.likes.push(id)
        await api.saveUser(user)
    }

    async Unlike(id) {
        const user = await api.getUser()
        user.freetrack.likes = user.freetrack.likes.filter(ft => ft !== id)
        await api.saveUser(user)
    }
}

export const freetrackService = new FreeTrackService()