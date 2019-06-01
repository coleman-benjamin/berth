import * as Phaser from "phaser";
import { Link } from "./link";

export class BaseScene extends Phaser.Scene {

    /**
     * Base Scene constructor
     * 
     * @param key : string : Scene Key, e.g. "StartScene"
     * @param hasReplay : boolean : Enable responding to restart button. Use in first scene if multiple
     */
    constructor(key, hasReplay) {
        super({ key });

        // A way to interface with the parent DOM
        this.link = new Link();

        // Use it already, wow look so handy
        this.hasReplay = !!hasReplay;
        if (this.hasReplay) {
            this.link.addReplay(this.onReplay.bind(this));
        }
    }

    /**
     * When extending, call super.preload() for this baby lock and load
     */
    preload() {
        this.load.path = process.env.ASSETS_PATH;
    }

    /**
     * Replay the scene(s).
     * 
     * When extending this, define the method "reset" to do any necessary cleanup
     */
    onReplay(e) {
        if (!e.data || e.data !== "replay") return;

        // Hide all scenes, reset if defined
        for (const scenePlugin of this.sys.scenePlugin.manager.scenes) {

            scenePlugin.scene.setVisible(false);

            if (this.hasOwnProperty("reset") && typeof this.reset === "function") {
                scenePlugin.scene.reset();
            }
        }

        // This should be the first scene restarting
        this.scene.restart();
    }

    /**
     * When the last scene has done. Uses link to show replay button if configured
     * 
     * @param dispatchReplay : boolean : dispatch event to show replay button. Use in last scene if multiple
     */
    endScene(dispatchReplay = false) {
        this.scene.pause();
        if (dispatchReplay) {
            this.link.dispatchReplay();
        }
    }
}