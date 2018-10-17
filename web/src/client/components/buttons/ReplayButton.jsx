import React, { Component } from "react";

class ReplayButton extends Component {
    render() {
        return (
            <div id="btn_replay" className="red-btn bottom-btn">
                REPLAY
            </div>
        );
    }

    componentDidMount() {
        document.getElementById("btn_replay").style.display = "none";
    }
}

export default ReplayButton;