import * as Phaser from 'phaser';

class Scapula {
    constructor(scene, startX, startY, endX, endY, maxScale) {
        this.scene = scene;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.maxScale = maxScale;

        this.emitter = new Phaser.Events.EventEmitter();

        this.pathPercentage = 1;
        this.percentageDec = 0.05;
        this.duration = 1000;
        this.counter = 0;
        this.mod = 6;

        /*
            Draw trajectory
         */
        this.trajectory = new Phaser.Geom.Line(this.startX, this.startY, this.endX, this.endY);
        this.graphics = this.scene.add.graphics({
            lineStyle: {
                width: 2,
                color: 0xefc53f
            }
        });
        this.graphics.strokeLineShape(this.trajectory);

        /*
            Get rotation
         */
        this.radian = Phaser.Geom.Line.Angle(this.trajectory) + Math.PI / 2;
    }

    create() {
        /*
            Create Curve game object
         */
        let curveWidth = initWidth * 0.054;
        let secondWidth = curveWidth / 3;
        let thirdWidth = curveWidth - secondWidth;

        let startPoint = new Phaser.Math.Vector2(0, curveWidth);
        let controlPoint1 = new Phaser.Math.Vector2(secondWidth, thirdWidth);
        let controlPoint2 = new Phaser.Math.Vector2(thirdWidth, thirdWidth);
        let endPoint = new Phaser.Math.Vector2(curveWidth, curveWidth);

        let curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);

        let curveObj = this.scene.add.curve(this.startX, this.startY, curve, 0xefc53f, 0.5);
        curveObj.setStrokeStyle(2, 0xefc53f);
        curveObj.setRotation(this.radian);

        this.lastAddedCurve = curveObj;

        /*
            Assign tween that goes from the end of the line to the beginning
         */
        let nextPoint = Phaser.Geom.Line.GetPoint(this.trajectory, this.pathPercentage);

        this.scene.tweens.add({
            targets : curveObj,
            x : nextPoint.x,
            y : nextPoint.y,
            scaleX : this.maxScale * this.pathPercentage,
            scaleY : this.maxScale * this.pathPercentage,
            duration: this.duration * this.pathPercentage,
            ease :  'Expo.easeInOut'
        });

        this.pathPercentage -= this.percentageDec;
    }

    update() {
        if (this.pathPercentage > 0.1) {
            if (this.counter % this.mod === 0) {
                this.create();
                this.counter = 0;
            }
            this.counter ++;
        } else {
            if (!this.scene.tweens.getTweensOf(this.lastAddedCurve)[0].isPlaying()) {
                this.emitter.emit("done");
            }
        }
    }
}

export default Scapula;
