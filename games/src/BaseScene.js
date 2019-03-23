import * as Phaser from "phaser";

export class BaseScene extends Phaser.Scene {

    /*
        Base Scene constructor
        @param key : string : Scene Key, e.g. "StartScene"
        @param hasReplay : boolean : Enable responding to restart button. Use in first scene if multiple
     */
    constructor(key, hasReplay) {
        super({key});

        this.hasReplay = !!hasReplay;

        if (this.hasReplay) { // Register replay button handlers
            this.registerWindowHandlers({
                "post-replay": this.postReplay.bind(this),
                "message": this.onReplay.bind(this)
            });
        }
    }

    /*
        Register window event listeners (e.g. replay)
        @param handlers : object : { "event-name" : function }
     */
    registerWindowHandlers(handlers) {
        for (const [event, handler] of Object.entries(handlers)) {
            window.addEventListener(event, handler);
        }
    }

    /*
        Post message to show replay button
     */
    postReplay() {
        parent.postMessage("showReplay", "*");
    }

    /*
        Replay the scene(s)
     */
    onReplay(e) {
        if (!e.data || e.data !== "replay") return; // Validate message coming from generic message event

        // Hide all scenes
        for (const scenePlugin of this.sys.scenePlugin.manager.scenes) {
            scenePlugin.scene.setVisible(false);
        }

        // This should be the first scene restarting
        this.scene.restart();
    }

    /*
        End of the scenes
        @param dispatchReplay : boolean : dispatch event to show replay button. Use in last scene if multiple
     */
    endScene(dispatchReplay) {
        this.scene.pause();
        if (dispatchReplay) {
            window.dispatchEvent(new Event('post-replay'));
        }
    }
}
