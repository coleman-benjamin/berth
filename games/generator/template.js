import Phaser from 'phaser';
import StartScene from "./StartScene";

let initWidth = document.querySelector("#game").offsetWidth;
let initHeight = initWidth / 2;

const game = new Phaser.Game({
    parent: "game",
    type: Phaser.AUTO,
    width: initWidth,
    height: initHeight,
    backgroundColor : '#22292f',
    scene: [
        StartScene
    ]
});
;;;
import * as Phaser from 'phaser';

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key : 'startScene' });
    }

    create() {
        window.addEventListener("message", this.onRestart.bind(this));
    }

    update() {

    }

    onRestart(e) {
        if (e.data === "replay") {
            this.scene.restart();
        }
    }
}

export default StartScene;
