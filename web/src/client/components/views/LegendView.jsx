import React, { Component } from "react";
import { Link } from 'react-router-dom';

class LegendView extends Component {
    render() {
        return (
            <ul id="legend">
                <li><Link to="/welcome">Welcome</Link></li>
                <li><Link to="/lines">Lines</Link></li>
                <li><Link to="/interactions">Interactions</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><a>&nbsp;</a></li>
                <li><a>&nbsp;</a></li>
                <li><a>&nbsp;</a></li>
                <li><a>&nbsp;</a></li>
                <li><a>&nbsp;</a></li>
            </ul>
        );
    }

    componentDidMount() {
        const maxHeight = 1000;
        const legendItems = document.querySelector("#legend").getElementsByTagName("li");

        let currentHeight = maxHeight / legendItems.length;
        for (let x = 0; x < legendItems.length; x++) {
            legendItems[x].firstElementChild.style.paddingTop = currentHeight / 1.7 + 'px';
            legendItems[x].firstElementChild.style.paddingBottom = currentHeight / 1.7 + 'px';
            currentHeight /= 1.25;
        }
    }
}

export default LegendView;