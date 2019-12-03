import axios from 'axios';

class ApiService {
    constructor() {
        this.http = axios;
    }

    getGames(callback) {
        this.http.get("/api/games")
            .then(response => callback(response))
            .catch(e => console.log(e));
    }

    getGame(gameId, callback) {
        this.http.get("/api/games/" + gameId)
            .then(response => callback(response))
            .catch(e => console.log(e));
    }

    getSettings(callback) {
        this.http.get("/api/settings/")
            .then(response => callback(response))
            .catch(e => console.log(e));
    }
}

export default ApiService;