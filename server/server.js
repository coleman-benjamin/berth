#!/usr/bin/env node

// Globals
__root = __dirname.replace(/[\\]/g, "/");

// Imports
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require('path');
const config = require(__root + "/config/config");
const exception = require(__root + "/exception/exception");

/*
	Express App configuration
*/

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
    View engine setup
 */
const viewDir = path.join(__dirname, 'view');
const hbs = exphbs.create({
    defaultLayout : viewDir + '/layouts/master',
    partialsDir : viewDir + '/partials'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', viewDir);

/*
	Load the Controllers / Register Controller Routes
*/

let controllersPath = __root + "/controller/";
let fileNames = fs.readdirSync(controllersPath);
fileNames.forEach( (fileName) => {
    let controller = require(controllersPath + fileName);
    if (typeof controller === 'object') { // ignores abstract Controller
        controller.registerRoutes(app);
    }
});

// 404
app.use((req, res) => {
    res.status(404);
    res.render("404", {
        title : "Page Not Found",
    });
});

//500
app.use((error, req, res, next) => {
    if (error instanceof exception.ResourceNotFoundException) {
        res.status(404);
        res.render("404", {
            title : "Page Not Found",
        });
    } else { // catch all 500
        res.status(500);
        res.render("500", {
            title : "Server Error"
        })
    }
});

/*
    Start server
*/
const server = app.listen(config.server.httpPort, (err) => {
    if (err) console.log(err);
    else {
        let address = server.address().address;
        let port = server.address().port;
        console.log("Started project, listening on " + address + ":" + port);
    }
});

// Shutdown node gracefully when receive SIGINT/SIGTERM signals
exitOnSignal('SIGINT');
exitOnSignal('SIGTERM');
process.stdin.resume();

function exitOnSignal(signal) {
    process.on(signal, () => {
        process.exit(0);
    });
}
