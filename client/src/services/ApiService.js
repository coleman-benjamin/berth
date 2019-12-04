import axios from 'axios';

class ApiService {
	getGames() {
		return axios.get("/api/games").then(response => response)
	}

	getGame(gameId) {
		return axios.get(`/api/games/${gameId}`).then(response => response)
	}
}

export default ApiService;