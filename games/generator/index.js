const prompt = require("prompt");
const fs = require("fs");
const moment = require("moment");
const path = require("path");

const TEMPLATE_PATH = "./template.js";
const TEMPLATE_SEPARATOR = ";;;\n";
const SRC_PATH = path.resolve("../src") + "/";
const FILENAMES = {
    MAIN : "main.js",
    META : "meta.json",
    START_SCENE : "StartScene.js"
};

const inputSchema = {
    properties : {
        name : {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Game name must be only letters, spaces, or dashes',
            required: true
        }
    }
};

prompt.start();

prompt.get(inputSchema, createGameBase);

async function createGameBase(err, input) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Creating base for " + input.name);

    let game_id = input.name.toLowerCase().replace(/ /, "_");
    let game_dir = SRC_PATH + game_id + "/";

    let meta = {
        "id" : game_id,
        "title" : input.name,
        "created_at" : moment().format()
    };

    try {
        await createFolder(game_dir);
        let template = await getTemplate()
        writeFile(game_dir + FILENAMES.MAIN, template[0]).then(() => { console.log("Wrote " + game_dir + FILENAMES.MAIN)});
        writeFile(game_dir + FILENAMES.START_SCENE, template[1]).then(() => { console.log("Wrote " + game_dir + FILENAMES.START_SCENE)});
        writeFile(game_dir + FILENAMES.META, JSON.stringify(meta, null, 2)).then(() => {console.log("Wrote " + game_dir + FILENAMES.META)});
    } catch(e) {
        console.log(e);
    }
}

async function createFolder(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

async function getTemplate() {
    return new Promise((resolve, reject) => {
        fs.readFile(TEMPLATE_PATH, (err, file) => {
            if (err) reject(err);
            else {
                let body = new Buffer(file).toString("utf8");
                resolve(body.split(TEMPLATE_SEPARATOR));
            }
        })
    })
}

async function writeFile(path, body) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, body, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}


