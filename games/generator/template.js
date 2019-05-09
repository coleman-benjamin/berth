// Loader loads
import { Loader } from "../loader";

// Add Scenes
import { StartScene } from './start_scene';

// Loader load
Loader.loadGame([StartScene]);
;;;
import { Scene } from 'phaser';
import { BaseScene } from "../base_scene";

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
