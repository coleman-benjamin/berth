import React, { Component } from "react";
import BackButton from "../buttons/BackButton.jsx";
import ReplayButton from "../buttons/ReplayButton.jsx";
import ApiService from "../services/ApiService";
import GameView from "./GameView.jsx";

class LinesShowView extends Component {
    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.state = {
            line : {},
            replayStyle : {"display" : "none"}
        }
    }

    componentDidMount() {
        this.apiService.getLine(this.props.match.params.id, (response) => this.setState({line : response.data}));
        window.addEventListener("message", this.handleFrameMessage.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleFrameMessage.bind(this));
    }

    handleFrameMessage(e) {
        // Show replay button on game done event
        if (e.data === "done") {
            this.setState({
                replayStyle : {"display" : "block"}
            });
        }
    }

    onReplayClick() {
        // Send message to frame to reload game
        this.gameViewRef.iFrame.contentWindow.postMessage("replay", "*");

        // Hide replay button
        this.setState({
            replayStyle : {"display" : "none"}
        });
    }

    render() {
        return (
            <div>
                <GameView game={this.state.line} ref={(r) => this.gameViewRef = r}/>
                <BackButton href="/lines"/>
                <ReplayButton style={this.state.replayStyle} onClick={this.onReplayClick.bind(this)}/>
            </div>
        );
    }
}

export default LinesShowView;