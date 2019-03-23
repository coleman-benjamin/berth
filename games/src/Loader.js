import * as Phaser from 'phaser';

export class Loader {

    /*
        Construct a Phaser game instance
        @param scenes : array of imported classes that extend Phaser.Scene (or BaseScene)
        @param options : a way to override the default options or add more

        https://photonstorm.github.io/phaser3-docs/global.html#GameConfig
     */
    static loadGame(scene = [], options = {}) {

        // Default parent
        const parent = "game";

        // Default background color
        const backgroundColor = "#22292f";

        // Default ratio 2:1
        const width = document.querySelector("#game").offsetWidth;
        const height = width / 2;

        // Construct Phaser game
        new Phaser.Game({
            parent,
            backgroundColor,
            width,
            height,
            scene,
            ...options
        });
    }
}
