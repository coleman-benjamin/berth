import * as Phaser from 'phaser';

class StartScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.atlas('lines', '/media/Not-Literally/spritesheet.png', '/media/Not-Literally/spritesheet.json');
    }

    create() {
        this.anims.create({
            key : "linesAnim",
            frames: this.anims.generateFrameNames('lines', { prefix: 'Body-', start: 1, end: 9 }),
            frameRate: 1,
            repeat: -1
        });

        let fuzz = this.add.sprite(game.config.width / 2, game.config.height / 2, 'lines').play("linesAnim");

        let timeline = this.tweens.createTimeline();

        timeline.add({
            targets: fuzz,
            displayHeight : game.config.height,
            ease: 'Expo.easeInOut',
            duration: 5000
        });

        timeline.play();
    }
}

export default StartScene;
