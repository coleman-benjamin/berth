class Controller {
	constructor() {
		this.router = require("express").Router({ caseSensitive: true });
		this.routes = [];
		this.prefix = "/";
	}

	registerRoutes(app) {
		this.routes.forEach((route) => {
			if (route.middleware) {
				this.router[route.method](route.path, route.middleware, route.handler);
			} else {
				this.router[route.method](route.path, route.handler);
			}
			console.log(`Route: ${route.method.toUpperCase()} ${this.prefix}${route.path}`);
		});
		app.use(this.prefix, this.router);
	}
}

module.exports = Controller;