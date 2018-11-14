import React from "react";
import ApiService from "../services/ApiService";
import BackButton from "../buttons/BackButton.jsx";

class AboutView extends React.Component {
    constructor() {
        super();
        this.apiService = new ApiService();
        this.state = {
            settings : {}
        }
    }

    componentDidMount() {
        this.apiService.getSettings(response => this.setState({settings : response.data}))
    }

    render() {
        return (
            <div>
                <pre>{this.state.settings.message}</pre>

                <div>
                    <BackButton href="/"/>
                </div>
            </div>
        );
    }
}

export default AboutView;