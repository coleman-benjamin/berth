import { BaseScene } from "../../src/base_scene";
import * as dat from 'dat.gui';

export class StartScene extends BaseScene {

    constructor() {
        super("StartScene");

        this.settings = null;
        this.numSettings = null;
        this.rows = null;
        this.store = {};
        this.maxSettings = 100;
        this.maxRows = 10;
        this.animFrames = null;

        this.counter = 0;
        this.mod = 60;
    }

    preload() {
        this.load.path = process.env.ASSETS_PATH;
        this.load.atlas('sprites', 'sprites.png', 'sprites.json');
    }

    create() {
        // TODO: cache
        this.numSettings = 2; // can only be integer
        this.rows = 1; // can only divide numSettings to integer (what's the term?)
        this.updateStore();

        this.animFrames = this.anims.generateFrameNames('sprites');
        this.anims.create({
            key: "anim",
            frames: this.animFrames,
            frameRate: 3,
            repeat: -1
        });

        let points = this.calculatePoints(this.numSettings, this.rows);
        this.settings = this.drawPoints(points);

        const gui = new dat.GUI();
        gui.add(this, "numSettings", this.numSettings, this.maxSettings).step(1);
        gui.add(this, "rows", this.rows, this.maxRows).step(1);
    }

    update() {
        if (this.counter % this.mod === 0) {
            if (this.store.numSettings !== this.numSettings || this.store.rows !== this.rows) { // check settings changed
                if (this.numSettings % this.rows === 0) { // check valid settings
                    this.updateStore();
                    let points = this.calculatePoints(this.numSettings, this.rows);
                    this.settings.destroy(true);
                    this.settings = this.drawPoints(points);
                    this.rotate();
                }
            }
        }
        this.counter++;
    }

    calculatePoints(numSettings, rows) {
        const points = [];

        const columns = numSettings / rows;
        const xInc = this.sys.game.config.width / columns;
        const yInc = this.sys.game.config.height / rows;
        const xOrig = xInc / 2;
        const yOrig = yInc / 2;

        let x = xOrig;
        let y = yOrig;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                points.push({ x, y });
                x += xInc;
            }
            x = xOrig;
            y += yInc;
        }

        return points;
    }

    drawPoints(points) {
        const group = this.add.group();
        for (let point of points) {
            let setting = this.add.sprite(point.x, point.y, 'sprites');
            let startFrame = Phaser.Math.RND.between(0, this.animFrames.length);
            setting.play("anim", false, startFrame);
            group.add(setting);
        }
        return group;
    }

    updateStore() {
        this.store = {
            numSettings: this.numSettings,
            rows: this.rows,
        };
    }

    rotate() {
        for (let setting of this.settings.getChildren()) {
            setting.angle = Phaser.Math.RND.between(-180, 180);
        }
    }
}
