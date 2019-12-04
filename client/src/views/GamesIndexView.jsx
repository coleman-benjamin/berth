import React from "react";
import BackButton from "@/buttons/BackButton.jsx";
import ApiService from "@/services/ApiService";
import GameListView from "@/views/GameListView.jsx";

const apiService = new ApiService();

class GamesIndexView extends React.Component {
	constructor() {
		super();
		this.state = {
			games: []
		}
	}

	componentDidMount() {
		apiService.getGames().then(games => this.setState({ games }))
			.catch(e => this.setState({ e }));
	}

	render() {
		if (this.state.e) throw this.state.e;
		return (
			<div>
				<GameListView games={this.state.games} />
				<BackButton href="/" />
			</div>
		);
	}
}

export default GamesIndexView;