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
		apiService.getGames().then(response => this.setState({ games: response.data }));
	}

	render() {
		return (
			<div>
				<GameListView games={this.state.games} />
				<BackButton href="/" />
			</div>
		);
	}
}

export default GamesIndexView;