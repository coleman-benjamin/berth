#!/usr/bin/env node
require("dotenv").config({ path: "./server/.env" });

const fs = require("fs");
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const CONTROLLERS_PATH = path.resolve(__dirname, "./src/controller");
const PUBLIC_PATH = path.resolve(__dirname, './public');

/*
	Express App configuration
*/
const app = express();

app.use(express.static(PUBLIC_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

/*
	Load the Controllers / Register Controller Routes
*/
const fileNames = fs.readdirSync(CONTROLLERS_PATH);
fileNames.forEach((fileName) => {
	const controller = require(`${CONTROLLERS_PATH}/${fileName}`);
	if (typeof controller === 'object') { // ignores base Controller
		controller.registerRoutes(app);
	}
});

// Direct all other calls to front end UI
app.get("*", (req, res) => res.sendFile(`${PUBLIC_PATH}/index.html`));

// Error handler
app.use((err, req, res, next) => res.status(err.status_code ? err.status_code : 500).json(err));

/*
    Start server
*/
const server = app.listen(process.env.PORT, (err) => {
	if (err) console.log(err);
	else console.log(`Started project, listening on ${server.address().address}:${server.address().port}`);
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
