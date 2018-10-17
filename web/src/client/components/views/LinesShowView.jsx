import React, { Component } from "react";
import BackButton from "../buttons/BackButton.jsx";
import ApiService from "../services/ApiService";
import GameView from "./GameView.jsx";

class LinesShowView extends Component {
    constructor() {
        super();
        this.apiService = new ApiService();
        this.state = {
            line : {}
        }
    }

    componentDidMount() {
        this.apiService.getLine(this.props.match.params.id, (response) => this.setState({line : response.data}));
    }

    render() {
        return (
            <div>
                <GameView game={this.state.line}/>

                <div>
                    <BackButton href="/lines"/>
                </div>
            </div>
        );
    }
}

export default LinesShowView;