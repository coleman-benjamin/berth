import * as Phaser from 'phaser';
import StartScene from './scene/StartScene';

let initWidth = $("#frame").width();
let initHeight = initWidth / 2;

const game = new Phaser.Game({
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    parent: 'parent',
    width: initWidth,
    height: initHeight,
    backgroundColor : '#22292f',
    scene: [
        StartScene,
    ]
});
