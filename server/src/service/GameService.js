const path = require("path");
const FileSystem = require("../database/FileSystem");
const { ResourceNotFoundException } = require("../exception");

class GameService {
	constructor() {
		this.adapter = new FileSystem(path.resolve(__dirname, "../../data"));
		this.gamesCollectionName = "games";
	}

	async getAll() {
		try {
			const records = await this.adapter.fetchCollection(this.gamesCollectionName);
			return Promise.resolve(Object.keys(records).map(r => records[r]));
		} catch (e) {
			return Promise.reject(e);
		}
	}

	async getById(id) {
		try {
			const records = await this.adapter.fetchCollection(this.gamesCollectionName);
			if (!records[id]) throw new ResourceNotFoundException();
			return Promise.resolve(records[id]);
		} catch (e) {
			return Promise.reject(e);
		}
	}
}

module.exports = GameService;
