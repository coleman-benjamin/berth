import React, { Component } from "react";
import { Link } from 'react-router-dom';
import BackButton from "./buttons/BackButton.jsx";
import axios from 'axios';

const LinesList = ({lines}) => (
    lines.map(line => <li key={line.id}><Link to={`/lines/${line.id}`}>{line.title}</Link></li>)
);

class LinesIndex extends Component {
    constructor() {
        super();
        this.state = {
            lines : []
        }
    }

    componentDidMount() {
        axios.get("/api/lines")
            .then(response => this.setState({lines : response.data}))
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div>
                <ul>
                    <LinesList lines={this.state.lines}/>
                </ul>

                <div>
                    <BackButton href="/"/>
                </div>
            </div>
        );
    }
}

export default LinesIndex;