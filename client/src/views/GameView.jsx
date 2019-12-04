import React from "react";

class GameView extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			this.props = nextProps;

			//Size iframe to fill the content frame
			let contentFrame = document.querySelector("#frame");
			this.iFrame.width = contentFrame.clientWidth;
			this.iFrame.height = contentFrame.clientWidth / 2;

			// Load game data into iFrame
			this.iFrame.onload = () => {
				this.iFrame.contentWindow.postMessage(this.props.game, "*");
			};
		}
	}

	render() {
		return (
			<iframe
				ref={(f) => this.iFrame = f}
				src='/game.html'
				scrolling='no'
				frameBorder='0'
			>
			</iframe>
		)
	}
}

export default GameView;