const GameService = require(__root + "/service/GameService");
const gameService = new GameService();
const ModeMiddleware = require(__root + "/middleware/ModeMiddleware");
const viewPath = "pages/lines/";

class LineController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/lines";
        this.routes = [
            { path: "/", method: this.METHOD.GET, middleware : ModeMiddleware, handler: this.index },
            { path: "/:id", method: this.METHOD.GET, middleware : ModeMiddleware, handler: this.show },
        ];
    }

    index(req, res) {
        gameService.getAllByCategory(req.query.mode, "lines", (err, lines, next) => {
            if (err) next(err);
            res.render(viewPath + 'index', {
                title : "Lines",
                lines : lines
            });
        })
    }

    show(req, res) {
        gameService.getById(req.query.mode, req.params.id, (err, line, next) => {
            if (err) next(err);
            res.render(viewPath + 'single', {
                title : line.title,
                scripts : line.scripts
            });
        });
    }
}

module.exports = new LineController();
