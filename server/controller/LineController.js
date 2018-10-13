const GameService = require(__root + "/service/GameService");
const EnvironmentMiddleware = require(__root + "/middleware/EnvironmentMiddleware");

const gameService = new GameService();
const viewPath = "pages/lines/";

class LineController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/lines";
        this.routes = [
            { path: "/", method: this.METHOD.GET, handler: this.index },
            { path: "/:id", method: this.METHOD.GET, handler: this.show },
        ];
    }

    index(req, res) {
        gameService.getAll("lines", (err, lines) => {
            res.render(viewPath + 'index', {
                title : "Lines",
                lines : lines
            });
        })
    }

    show(req, res) {
        gameService.getById(req.params.id, (err, line) => {
            res.render(viewPath + 'single', {
                title : line.title,
                scripts : line.devScripts
            });
        });
    }
}

module.exports = new LineController();
