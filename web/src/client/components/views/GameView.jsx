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
                    ref={(f) => this.iFrame = f }
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