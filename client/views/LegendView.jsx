import React  from "react";
import { Link } from 'react-router-dom';

class LegendView extends React.Component {
    constructor() {
        super();
        this.active = "";
    }
    render() {
        return (
            <ul id="legend">
                <li><Link to="/welcome">Welcome</Link></li>
                <li><Link to="/games">Games</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><a>&nbsp;</a></li>
                <li><a>&nbsp;</a></li>
                <li><a>&nbsp;</a></li>
                <li><a>&nbsp;</a></li>
                <li><a>&nbsp;</a></li>
                <li><a className={this.active} onClick={this.wave.bind(this)}>&nbsp;</a></li>
            </ul>
        );
    }

    componentDidMount() {
        // Size items as a curve
        const maxHeight = 1000;
        const legendItems = document.querySelector("#legend").getElementsByTagName("li");

        let currentHeight = maxHeight / legendItems.length;
        for (let x = 0; x < legendItems.length; x++) {
            legendItems[x].firstElementChild.style.paddingTop = currentHeight / 1.7 + 'px';
            legendItems[x].firstElementChild.style.paddingBottom = currentHeight / 1.7 + 'px';
            currentHeight /= 1.25;
        }
    }

    wave() {
        this.active = "active-btn";
    }
}

export default LegendView;