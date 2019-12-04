import axios from 'axios';

class ApiService {
	getGames() {
		return axios.get("/api/games").then(response => response.data)
	}

	getGame(gameId) {
		return axios.get(`/api/games/${gameId}`).then(response => response.data)
	}
}

export default ApiService;