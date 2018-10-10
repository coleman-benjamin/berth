import * as Phaser from 'phaser';
import BootScene from './scene/BootScene';
import TitleScene from './scene/TitleScene';
import GameScene from './scene/GameScene';

let initWidth = document.getElementById('frame').width;
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
        BootScene,
        TitleScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);
