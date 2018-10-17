import React, { Component } from "react";
import { Link } from 'react-router-dom';
import BackButton from "../buttons/BackButton.jsx";
import ApiService from "../services/ApiService";

const LinesList = ({lines}) => (
    lines.map(line => <li key={line.id}><Link to={`/lines/${line.id}`}>{line.title}</Link></li>)
);

class LinesIndexView extends Component {
    constructor() {
        super();
        this.apiService = new ApiService();
        this.state = {
            lines : []
        }
    }

    componentDidMount() {
        this.apiService.getLines(response => this.setState({lines : response.data}))
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

export default LinesIndexView;