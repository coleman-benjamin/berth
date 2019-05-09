// Loader loads
import { Loader } from "../src/loader";

// Add Scenes
import { StartScene } from './start_scene';

// Loader load
Loader.loadGame([StartScene]);
;;;
import { Scene } from 'phaser';

export class StartScene extends Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {

    }

    create() {

    }

    update() {

    }
}
