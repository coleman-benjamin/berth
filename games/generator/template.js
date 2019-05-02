// Loader loads
import { Loader } from "../loader";

// Add Scenes
import { StartScene } from './start_scene';

// Loader load
Loader.loadGame([StartScene]);
;;;
import * as Phaser from 'phaser';
import { BaseScene } from "../base_scene";

export class StartScene extends BaseScene {
    constructor() {
        super({ key: 'startScene' });
    }

    preload() {

    }

    create() {

    }

    update() {

    }
}
