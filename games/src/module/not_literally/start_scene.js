import * as Phaser from 'phaser';

class StartScene extends Phaser.Scene {

    constructor() {
        super({ key: "StartScene" })
    }

    preload() {
        this.load.path = process.env.ASSETS_PATH;
        this.load.atlas('lines', 'spritesheet.png', 'spritesheet.json');
    }

    create() {
        this.anims.create({
            key: "linesAnim",
            frames: this.anims.generateFrameNames('lines', { prefix: 'Body-', start: 1, end: 9 }),
            frameRate: 1,
            repeat: -1
        });

        const fuzz = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'lines')
            .play("linesAnim");

        const timeline = this.tweens.createTimeline();

        timeline.add({
            targets: fuzz,
            displayHeight: this.sys.game.config.height,
            ease: 'Expo.easeInOut',
            duration: 3000
        });

        timeline.add({
            targets: fuzz,
            displayWidth: this.sys.game.config.width,
            ease: 'Expo.easeInOut',
            duration: 3000
        });


        timeline.play();
    }
}

export default StartScene;
