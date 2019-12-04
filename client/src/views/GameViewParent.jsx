import React from "react";
import BackButton from "@/buttons/BackButton.jsx";
import ReplayButton from "@/buttons/ReplayButton.jsx";
import ApiService from "@/services/ApiService";
import GameView from "@/views/GameView.jsx";

const apiService = new ApiService();

class GameViewParent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			game: {},
			replayStyle: { "display": "none" }
		}
	}

	componentDidMount() {
		window.addEventListener("message", this.handleFrameMessage.bind(this));
		apiService.getGame(this.props.match.params.id).then(response => this.setState({ game: response.data }));
	}

	componentWillUnmount() {
		window.removeEventListener("message", this.handleFrameMessage.bind(this));
	}

	handleFrameMessage(e) {
		// Show replay button on game done event
		if (e.data === "showReplay") {
			this.setState({
				replayStyle: { "display": "block" }
			});
		}
	}

	onReplayClick() {
		// Send message to frame to reload game
		this.gameViewRef.iFrame.contentWindow.postMessage("replay", "*");

		// Hide replay button
		this.setState({
			replayStyle: { "display": "none" }
		});
	}

	render() {
		return (
			<div>
				<GameView game={this.state.game} ref={(r) => this.gameViewRef = r} />
				<BackButton href="/games" />
				<ReplayButton style={this.state.replayStyle} onClick={this.onReplayClick.bind(this)} />
			</div>
		);
	}
}

export default GameViewParent;