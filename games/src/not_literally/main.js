import * as Phaser from 'phaser';
import StartScene from './StartScene';

let initWidth = document.body.clientWidth;
let initHeight = initWidth / 2;

const game = new Phaser.Game({
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    width: initWidth,
    height: initHeight,
    backgroundColor : '#22292f',
    scene: [
        StartScene,
    ]
});
