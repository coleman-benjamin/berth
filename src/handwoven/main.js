import * as Phaser from 'phaser';
import StartScene from './scene/StartScene';
import EndScene from './scene/EndScene';

let initWidth = $("#frame").width();
let initHeight = initWidth / 2;

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'parent',
    width: initWidth,
    height: initHeight,
    backgroundColor : '#22292f',
    scene: [
        StartScene,
        EndScene,
    ]
});
