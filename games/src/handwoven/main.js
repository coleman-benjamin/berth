import Phaser from 'phaser';
import StartScene from './StartScene';
import EndScene from './EndScene';

let initWidth = document.querySelector("#game").offsetWidth;
let initHeight = initWidth / 2;

const game = new Phaser.Game({
    parent: "game",
    type: Phaser.AUTO,
    width: initWidth,
    height: initHeight,
    backgroundColor : '#22292f',
    scene: [
        StartScene,
        EndScene,
    ]
});
