import Phaser from 'phaser';
import StartScene from './StartScene';
import EndScene from './EndScene';

let initWidth = window.getComputedStyle(document.getElementById("parent")).width;
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
