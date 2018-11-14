import React, { Component } from "react";

class ReplayButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="red-btn bottom-btn" style={this.props.style} onClick={this.props.onClick}>
                <a>Replay</a>
            </div>
        );
    }
}

export default ReplayButton;