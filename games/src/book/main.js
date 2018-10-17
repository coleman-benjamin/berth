import Phaser from 'phaser';
import BootScene from './scene/BootScene';
import TitleScene from './scene/TitleScene';
import GameScene from './scene/GameScene';

let initWidth = document.body.clientWidth;
let initHeight = initWidth / 2;

const game = new Phaser.Game({
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    width: initWidth,
    height: initHeight,
    backgroundColor : '#22292f',
    scene: [
        BootScene,
        TitleScene,
        GameScene
    ]
});
