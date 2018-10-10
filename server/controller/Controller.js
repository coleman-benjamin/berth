class Controller {
    constructor() {
        this.METHOD = {
            GET : "get",
            POST : "post",
            PUT : "put",
            DELETE : "delete",
        };

        this.router = require("express").Router({
            caseSensitive : true
        });
        this.routes = [];
        this.prefix = "";
    }

    registerRoutes(app) {
        this.routes.forEach((route) => {
            if (route.middleware) {
                this.router[route.method](route.path, route.middleware, route.handler);
            } else {
                this.router[route.method](route.path, route.handler);
            }
        });
        app.use((this.prefix ? this.prefix : "/"), this.router);
    }
}

module.exports = Controller;