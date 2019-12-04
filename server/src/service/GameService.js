const path = require("path");
const FileSystem = require("../database/FileSystem");
const { ResourceNotFound } = require("../exception");

const fsAdapter = new FileSystem(path.resolve(__dirname, "../../data"));
const COLLECTION_NAME = "games";

class GameService {
	async getAll() {
		try {
			const records = await fsAdapter.fetchCollection(COLLECTION_NAME);
			return Promise.resolve(Object.keys(records).map(r => records[r]));
		} catch (e) {
			return Promise.reject(e);
		}
	}

	async getById(id) {
		try {
			const records = await fsAdapter.fetchCollection(COLLECTION_NAME);
			if (!records[id]) throw new ResourceNotFound();
			return Promise.resolve(records[id]);
		} catch (e) {
			return Promise.reject(e);
		}
	}
}

module.exports = GameService;
