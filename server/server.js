#!/usr/bin/env node

// Globals
__root = __dirname.replace(/[\\]/g, "/");
__src = __root + "/src";

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser= require("cookie-parser");
const fs = require("fs");
const path = require('path');
const config = require(__root + "/config");
const exceptionResponse = require(__src + "/exception/ExceptionResponse");

/*
	Path to public serving directory
*/
const publicPath = path.resolve(__dirname, './public');

/*
	Express App configuration
*/
const app = express();

app.use(express.static(publicPath));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
	Load the Controllers / Register Controller Routes
*/
const controllersPath = __src + "/controller/";
let fileNames = fs.readdirSync(controllersPath);
fileNames.forEach( (fileName) => {
    let controller = require(controllersPath + fileName);
    if (typeof controller === 'object') { // ignores abstract (uninitiated) Controller
        controller.registerRoutes(app);
    }
});

// Direct all other calls to front end UI
app.get("*", (req, res) => res.sendFile(publicPath + "/index.html"));

// 404 / 500
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

// Shutdown node gracefully when receive SIGINT/SIGTERM signals (for Docker)
exitOnSignal('SIGINT');
exitOnSignal('SIGTERM');
process.stdin.resume();

function exitOnSignal(signal) {
    process.on(signal, () => {
        process.exit(0);
    });
}
