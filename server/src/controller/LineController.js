const GameService = require(__src + "/service/GameService");

const gameService = new GameService();

class LineController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/api/lines";
        this.routes = [
            { path: "/", method: this.METHOD.GET, handler: this.index },
            { path: "/:id", method: this.METHOD.GET, handler: this.show },
        ];
    }

    index(req, res, next) {
        gameService.getAllByCategory("lines", (err, lines) => {
            if (err) next(err);
            else res.json(lines);
        })
    }

    show(req, res, next) {
        gameService.getById(req.params.id, (err, line) => {
            if (err) next(err);
            else res.json(line);
        });
    }
}

module.exports = new LineController();
