const GameService = require(__src + "/service/GameService");

const gameService = new GameService();

class GameController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/api/games";
        this.routes = [
            { path: "/", method: this.METHOD.GET, handler: this.index },
            { path: "/:id", method: this.METHOD.GET, handler: this.show },
        ];
    }

    index(req, res, next) {
        gameService.getAll((err, games) => {
            if (err) next(err);
            else res.json(games);
        })
    }

    show(req, res, next) {
        gameService.getById(req.params.id, (err, game) => {
            if (err) next(err);
            else res.json(game);
        });
    }
}

module.exports = new GameController();
