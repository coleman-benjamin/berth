import * as Phaser from 'phaser';
import {BaseScene} from "../BaseScene";

class EndScene extends BaseScene {
    constructor() {
        super("EndScene");
    }

    init(data) {
        this.endY = data.endY;
        this.firstLine = data.firstLine;
    }

    create() {
        this.counter = 0;
        this.lineCounter = 0;

        this.startPoints = [];
        this.lineGroup = [];
        this.maxLines = 40;

        let percentageStart = 0.5;
        let percentageEach = 0.015;

        this.startPoints.push(Phaser.Geom.Line.GetPoint(this.firstLine, percentageStart));

        for (let x = 1; x < this.maxLines; x++) {
            this.startPoints.push(Phaser.Geom.Line.GetPoint(this.firstLine, percentageStart - percentageEach));
            percentageStart -= percentageEach;
        }

        this.graphics = this.add.graphics({lineStyle: {width: 4, color: 0x9e3f76}});
        this.lineGroup.push(new Phaser.Geom.Line(this.startPoints[0].x, this.startPoints[0].y, this.startPoints[0].x, this.startPoints[0].y,));
        this.mod = Math.floor((this.sys.game.config.width) / this.startPoints.length);
    }

    update() {
        this.graphics.clear();

        for (let [index, line] of this.lineGroup.entries()) {
            if (line.y2 < this.endY) {
                line.setTo(this.startPoints[index].x, this.startPoints[index].y, this.startPoints[index].x, line.y2 + 2);
            }
            this.graphics.strokeLineShape(line);
        }

        this.counter++;
        if (this.counter % this.mod === 0) {
            this.lineCounter++;

            // Draw next line or end scene
            if (this.lineCounter < this.startPoints.length) {
                let nextP = this.startPoints[this.lineCounter];
                this.lineGroup.push(new Phaser.Geom.Line(nextP.x, nextP.y, nextP.x, nextP.y));
            } else {
                super.endScene(true);
            }

            this.counter = 0;
        }
    }
}

export default EndScene;
