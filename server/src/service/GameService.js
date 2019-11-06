const FileSystem = require(__src + "/database/FileSystem");
const Exception = require(__src + "/exception/Exception");

class GameService {
	constructor() {
		this.adapter = new FileSystem(__root + "/data/");
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
			if (!records[id]) throw new Exception.ResourceNotFoundException("id = \"" + id + "\"")
			return Promise.resolve(records[id]);
		} catch (e) {
			return Promise.reject(e);
		}
	}
}

module.exports = GameService;
