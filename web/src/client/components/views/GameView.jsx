import React, { Component } from "react";

class GameView extends Component {
    constructor() {
        super();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps)
            this.props = nextProps;
    }

    componentDidMount() {
        window.addEventListener("message", this.loadGameIntoFrame);
    }
    componentWillUnmount() {
        window.removeEventListener("message", this.unloadFrame);
    }

    loadGameIntoFrame(e) {
        this.ifr.onload = () => {
            this.ifr.contentWindow.postMessage('hello', "*");
        };
        console.log(e);
        // let scriptsHtml = "";
        // this.state.line.scripts.forEach((script) => {
        //     scriptsHtml += "<script type='text/javascript' src='" + script + "'></script>";
        // });
        //
        // let frame = document.getElementById("gameFrame").contentWindow.document;
        // frame.open();
        // frame.write("<html><head></head><body><div id='parent' style='width: 100%; height:400px'></div>" + scriptsHtml + "</body></html>");
        // frame.close();
    }

    unloadFrame(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <iframe
                    id={this.props.game.id + "_frame"}
                    sandbox="allow-scripts"
                    ref={(f) => this.ifr = f }
                >
                </iframe>
            </div>
        )
    }
}

export default GameView;