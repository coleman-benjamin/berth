import { BaseScene } from "@/base_scene";
import * as Phaser from "phaser";

class StartScene extends BaseScene {
	constructor() {
		super("StartScene", true);
	}

	create() {
		this.lineGroupA = [];
		this.lineGroupB = [];
		this.lineGroupC = [];
		this.counter = 0;
		this.numLines = 17;

		this.graphics = this.add.graphics({
			lineStyle: {
				width: 4,
				color: 0x9e3f76
			}
		});

		this.mod = Math.floor(this.sys.game.config.height / this.numLines);
	}

	update() {
		if (this.lineGroupA.length <= this.numLines) {
			this.graphics.clear();
			for (let x = 0; x < this.lineGroupA.length; x++) {
				this.lineGroupA[x].setTo(this.lineGroupA[x].x1, this.lineGroupA[x].y1 + 1, this.lineGroupA[x].x2, this.lineGroupA[x].y2 + 1);
				this.lineGroupB[x].setTo(this.lineGroupB[x].x1, this.lineGroupB[x].y1 + 1, this.lineGroupB[x].x2, this.lineGroupB[x].y2);
				this.lineGroupC[x].setTo(this.lineGroupC[x].x1, this.lineGroupC[x].y1, this.lineGroupC[x].x2, this.lineGroupC[x].y2 + 1);
				this.graphics.strokeLineShape(this.lineGroupA[x]);
				this.graphics.strokeLineShape(this.lineGroupB[x]);
				this.graphics.strokeLineShape(this.lineGroupC[x]);
			}

			if (this.counter % this.mod === 0) {
				this.lineGroupA.push(new Phaser.Geom.Line(0, 0, this.sys.game.config.width, 0));
				this.lineGroupB.push(new Phaser.Geom.Line(0, 0, this.sys.game.config.width, 0));
				this.lineGroupC.push(new Phaser.Geom.Line(0, 0, this.sys.game.config.width, 0));
			}
			this.counter++;
		} else {
			this.scene.pause();
			this.scene.launch('EndScene', {
				endY: this.lineGroupA[0].y1,
				firstLine: this.lineGroupB[0]
			});
		}
	}

	onRestart(e) {
		if (e.data === "replay") {
			this.scene.setVisible(false);
			this.scene.restart();
		}
	}
}

export default StartScene;
