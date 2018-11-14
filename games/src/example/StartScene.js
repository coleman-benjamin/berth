import * as Phaser from 'phaser';
import Scapula from './gameobject/Scapula';

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key : 'sceneOne' });
    }

    create() {
        let width = this.sys.game.config.width;
        let height = this.sys.game.config.height;

        let baseX = width / 2;
        let baseY = height - (height * 0.1);

        let sideX1 = baseX / 2,
            sideY1 = baseY - (baseY / 12.4),
            sideX2 = baseX / 4,
            sideY2 = baseY - (baseY / 5);

        this.scapulaGroup = [
            new Scapula(this, baseX, baseY, width / 2, height * 0.1, 5, true),
            new Scapula(this, baseX, baseY, width * 0.25, height * 0.4, 3, true),
            new Scapula(this, baseX, baseY, width - width * 0.25, height * 0.4, 3, true),
            new Scapula(this, sideX1, sideY1, sideX2, sideY2, 2),
            new Scapula(this, width - (sideX1), sideY1, width - (sideX2), sideY2, 2)
        ];

        window.addEventListener("message", this.onRestart.bind(this));

        this.scapulaGroup[this.scapulaGroup.length - 1].emitter.on('done', () => {
            parent.postMessage("done", "*");
            this.scene.pause();
        }, this);
    }

    update() {
        this.scapulaGroup.forEach((scapula) => {
            scapula.update();
        });
    }

    onRestart(e) {
        if (e.data === "replay") {
            this.scene.restart();
        }
    }
}

export default StartScene;
