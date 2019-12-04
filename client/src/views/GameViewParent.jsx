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
		apiService.getGame(this.props.match.params.id).then(game => this.setState({ game }))
			.catch(e => this.setState({ e }));

		window.addEventListener("message", this.handleFrameMessage.bind(this));
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
		if (this.state.e) throw this.state.e;
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