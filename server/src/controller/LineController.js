const GameService = require(__root + "/src/service/GameService");
const ModeMiddleware = require(__root + "/src/middleware/ModeMiddleware");

const gameService = new GameService();
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

    index(req, res, next) {
        gameService.getAllByCategory("lines", req.query.mode, (err, lines) => {
            if (err) next(err);
            else {
                res.render(viewPath + 'index', {
                    title : "Lines",
                    lines : lines
                });
            }
        })
    }

    show(req, res, next) {
        gameService.getById(req.params.id, req.query.mode, (err, line) => {
            if (err) next(err);
            else {
                res.render(viewPath + 'single', {
                    title : line.title,
                    scripts : line.scripts
                });
            }
        });
    }
}

module.exports = new LineController();
