const FileSystem = require(__root + "/src/database/FileSystem");
const Exception = require(__root + "/src/exception/Exception");

class GameService {
    constructor() {
        this.adapter = new FileSystem(__root + "/data/");
    }

    getAllByCategory(category, mode, callback) {
        this.adapter.fetchCollection(this.getCollectionName(mode), (err, records) => {
            if (err) callback(err);
            else {
                let result = [];
                Object.keys(records).forEach((key) => {
                    if (records[key].category === category) result.push(records[key]);
                });
                callback(err, result);
            }
        });
    }

    getById(id, mode, callback) {
        this.adapter.fetchCollection(this.getCollectionName(mode), (err, records) => {
            if (err) callback(err);
            else {
                let result = records[id];

                if (!result)
                    throw new Exception.ResourceNotFoundException(this.constructor.name + " by query : id = \"" + id + "\"");

                callback(err, result);
            }
        });
    }

    getCollectionName(mode) {
        return mode === "dev" ? "dev" : "build";
    }
}

module.exports = GameService;
