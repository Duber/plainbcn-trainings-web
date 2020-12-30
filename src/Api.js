export default class Api {
    getAll() {
        const url = 'http://localhost:3001/api/skills';
        return fetch(url).then((result) => result.json())
    }
}
