import axios from 'axios';

class ApiService {
    constructor() {
        this.http = axios;
    }

    getLines(callback) {
        this.http.get("/api/lines")
            .then(response => callback(response))
            .catch(e => console.log(e));
    }

    getLine(lineId, callback) {
        this.http.get("/api/lines/" + lineId)
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