import Phaser from 'phaser';

class StartScene extends Phaser.Scene {

    constructor() {
        super();
    }

    preload() {
        this.load.path = process.env.BUILD_ROOT + "/settings/assets/";
        this.load.atlas('sprites', 'sprites.png', 'sprites.json');
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
                points.push({x,y});
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
            let setting = this.add.sprite(point.x, point.y, 'sprites').play("anim");
            group.add(setting);
        }
        return group;
    }

    create() {
        const numSettings = 3; // can only be integer
        const rows = 1; // can only divide numSettings to integer (what's the term?)

        this.anims.create({
            key : "anim",
            frames: this.anims.generateFrameNames('sprites'),
            frameRate: 3,
            repeat: -1
        });

        let points = this.calculatePoints(numSettings, rows);
        let settings = this.drawPoints(points);

        // TODO: Actually make this work with DOM
        // window.addEventListener("message", (e) => {
        //     if (e.data.update) {
        //         points = this.calculatePoints(e.data.update.numSettings, e.data.update.rows);
        //         settings.destroy();
        //         settings = this.drawPoints(points);
        //     }
        // });
    }
}

export default StartScene;
