import React, { Component } from "react";
import { Link } from 'react-router-dom';

class BackButton extends Component {
    render() {
        return (
            <div id="btn_back" className="red-btn bottom-btn">
                <Link to={this.props.href}>Back</Link>
            </div>
        );
    }
}

export default BackButton;