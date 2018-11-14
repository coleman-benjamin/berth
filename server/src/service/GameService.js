const FileSystem = require(__src + "/database/FileSystem");
const Exception = require(__src + "/exception/Exception");

class GameService {
    constructor() {
        this.adapter = new FileSystem(__root + "/data/");
        this.gamesCollectionName = "games";
    }

    getAllByCategory(category, callback) {
        this.adapter.fetchCollection(this.gamesCollectionName, (err, records) => {
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

    getById(id, callback) {
        this.adapter.fetchCollection(this.gamesCollectionName, (err, records) => {
            if (err) callback(err);
            else {
                let result = records[id];

                if (!result)
                    callback(new Exception.ResourceNotFoundException("id = \"" + id + "\""));
                else
                    callback(err, result);
            }
        });
    }
}

module.exports = GameService;
