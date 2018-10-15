const FileSystem = require(__root + "/database/FileSystem");
const Exception = require(__root + "/exception/Exception");

class GameService {
    constructor() {
        this.adapter = new FileSystem();
        this.collection = null;
    }

    getAll(category, callback) {
        this.adapter.fetchCollection("dev", (err, records) => {
            let result = [];
            Object.keys(records).forEach((key) => {
                if (records[key].category === category) result.push(records[key]);
            });
            callback(err, result);
        });
    }

    getById(id, callback) {
        this.adapter.fetchCollection("dev", (err, records) => {
            let result = records[id];

            if (!result)
                throw new Exception.ResourceNotFoundException(this.constructor.name + " by query : id = \"" + id + "\"");

            callback(err, result);
        });
    }
}

module.exports = new GameService();
