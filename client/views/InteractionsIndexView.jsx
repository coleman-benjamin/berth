import React from "react";
import BackButton from "../buttons/BackButton.jsx";
import ApiService from "../services/ApiService";
import GameListView from "./GameListView.jsx";

class InteractionsIndexView extends React.Component {
    constructor() {
        super();
        this.apiService = new ApiService();
        this.state = {
            interactions : []
        }
    }

    componentDidMount() {
        // this.apiService.getLines(response => this.setState({lines : response.data}))
    }

    render() {
        return (
            <div>
                {/*<GameListView games={this.state.lines} />*/}
                <BackButton href="/"/>
            </div>
        );
    }
}

export default InteractionsIndexView;