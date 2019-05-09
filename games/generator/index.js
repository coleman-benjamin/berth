const prompt = require("prompt");
const fs = require("fs-extra");
const moment = require("moment");
const path = require("path");

const MODULE_PATH = path.resolve(__dirname, "../module") + "/";
const TEMPLATE_PATH = path.resolve(__dirname, "template.js");
const TEMPLATE_SEPARATOR = ";;;\n";
const FILENAMES = {
    MAIN: "main.js",
    META: "meta.json",
    START_SCENE: "start_scene.js"
};

const inputSchema = {
    properties: {
        name: {
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

    // Configure name for game directory
    const game_id = input.name.toLowerCase().replace(/ /, "_");
    const game_dir = MODULE_PATH + game_id + "/";

    // Content for meta file, prettify for write
    const meta = JSON.stringify({
        "id": game_id,
        "title": input.name,
        "created_at": moment().format()
    }, null, 2);

    try {
        // Create game directory
        await fs.mkdir(game_dir);

        // Get template file, 
        const file = await fs.readFile(TEMPLATE_PATH);
        const body = new Buffer(file).toString("utf8");
        const template = body.split(TEMPLATE_SEPARATOR)

        // File write operations
        const writes = [
            fs.writeFile(game_dir + FILENAMES.MAIN, template[0]),
            fs.writeFile(game_dir + FILENAMES.START_SCENE, template[1]),
            fs.writeFile(game_dir + FILENAMES.META, meta),
        ];

        Promise.all(writes)
            .then(() => {
                console.log(`Wrote template files to ${game_dir}`)
            })
            .catch((e) => {
                console.log(e);
            })
    } catch (e) {
        console.log(e);
    }
}