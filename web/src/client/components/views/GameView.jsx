import React, { Component } from "react";

class GameView extends Component {
    constructor() {
        super();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            this.iframe.onload = () => {
                this.iframe.contentWindow.postMessage(this.props.game, "*");
            };
        }
    }

    componentDidMount() {
        // window.addEventListener("onReplayClick", this.handleFrameTasks);
    }
    componentWillUnmount() {
        // window.removeEventListener("onReplayClick", this.handleFrameTasks);
    }

    handleFrameTasks(e) {
        // console.log(e);
    }

    render() {
        return (
            <div>
                <iframe
                    ref={(f) => this.iframe = f }
                    sandbox="allow-scripts"
                    src='/frame.html'
                    scrolling='no'
                    frameBorder='0'
                >
                </iframe>
            </div>
        )
    }
}

export default GameView;