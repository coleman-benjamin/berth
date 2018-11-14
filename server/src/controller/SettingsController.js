const GameService = require(__src + "/service/GameService");

const gameService = new GameService();

class SettingsController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/api/settings";
        this.routes = [
            { path: "/", method: this.METHOD.GET, handler: this.get }
        ];
    }

    get(req, res, next) {
        gameService.getById("settings", (err, settings) => {
            if (err) next(err);
            else res.json(settings);
        })
    }
}

module.exports = new SettingsController();