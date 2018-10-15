const FileSystem = require(__root + "/database/FileSystem");
const Exception = require(__root + "/exception/Exception");

class GameService {
    constructor() {
        this.adapter = new FileSystem();
    }

    getAllByCategory(mode, category, callback) {
        this.adapter.fetchCollection(this.getCollectionName(mode), (err, records) => {
            let result = [];
            Object.keys(records).forEach((key) => {
                if (records[key].category === category) result.push(records[key]);
            });
            callback(err, result);
        });
    }

    getById(mode, id, callback) {
        this.adapter.fetchCollection(this.getCollectionName(mode), (err, records) => {
            let result = records[id];

            if (!result)
                throw new Exception.ResourceNotFoundException(this.constructor.name + " by query : id = \"" + id + "\"");

            callback(err, result);
        });
    }

    getCollectionName(mode) {
        if (!mode) return "build";
        return mode === "dev" ? "dev" : "build";
    }
}

module.exports = GameService;
