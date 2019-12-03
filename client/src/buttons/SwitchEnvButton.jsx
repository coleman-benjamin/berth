import React, { Component } from "react";

class SwitchEnvButton extends Component {
    render() {
        return (
            <div id="btn_switch_env" className="red-btn top-btn">
                (-dev-)
            </div>
        );
    }

    componentDidMount() {
    }
}

export default SwitchEnvButton;