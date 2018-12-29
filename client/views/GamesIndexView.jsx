import React from "react";
import BackButton from "../buttons/BackButton.jsx";
import ApiService from "../services/ApiService";
import GameListView from "./GameListView.jsx";

class GamesIndexView extends React.Component {
    constructor() {
        super();
        this.apiService = new ApiService();
        this.state = {
            lines : []
        }
    }

    componentDidMount() {
        this.apiService.getGames(response => this.setState({lines : response.data}))
    }

    render() {
        return (
            <div>
                <GameListView games={this.state.lines} />
                <BackButton href="/"/>
            </div>
        );
    }
}

export default GamesIndexView;