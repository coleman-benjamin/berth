import * as Phaser from 'phaser';
import Boot from './scene/Boot';

let initWidth = $('#content').width();
let initHeight = initWidth / 2;

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    parent: 'frame',
    width: initWidth,
    height: initHeight,
    backgroundColor : '#22292f',
    scene: [
        Boot
    ]
};

const game = new Phaser.Game(config);
