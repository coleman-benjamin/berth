const GameService = require("../service/GameService");

const gameService = new GameService();

class GameController extends require("./Controller") {
	constructor() {
		super();
		this.prefix = "/api/games";
		this.routes = [
			{ path: "/", method: "get", handler: this.index },
			{ path: "/:id", method: "get", handler: this.show },
		];
	}

	index(req, res, next) {
		gameService.getAll()
			.then(games => res.json(games))
			.catch(e => next(e));
	}

	show(req, res, next) {
		gameService.getById(req.params.id)
			.then(game => res.json(game))
			.catch(e => next(e));
	}
}

module.exports = new GameController();
