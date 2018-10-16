import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Welcome from "./Welcome.jsx";

class Index extends Component {
    render() {
        return (
            <Router>
                <div>
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

                    <Route path="/welcome" component={Welcome} />
                </div>
            </Router>
        );
    }

    componentDidMount() {
        const maxHeight = 1000;
        const legendItems = $('#legend li');

        let currentHeight = maxHeight / legendItems.length;
        legendItems.each(function() {
            $(this).children('a').css('padding-top', currentHeight / 1.7 + 'px');
            $(this).children('a').css('padding-bottom', currentHeight / 1.7 + 'px');
            currentHeight /= 1.25;
        });
    }
}

export default Index;