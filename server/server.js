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
const exceptionResponse = require(__root + "/exception/ExceptionResponse");

/*
	Express App configuration
*/

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

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

// Exception responses
app.use(exceptionResponse.notFound);
app.use(exceptionResponse.serverError);

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
