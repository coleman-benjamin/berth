import React, { Component } from "react";
import BackButton from "../buttons/BackButton.jsx";
import axios from 'axios';

class LinesShowView extends Component {
    constructor() {
        super();
        this.state = {
            line : {}
        }
    }

    componentDidMount() {
        axios.get("/api/lines/" + this.props.match.params.id)
            .then(response => {
                this.setState({line : response.data});

                let scriptsHtml = "";
                this.state.line.scripts.forEach((script) => {
                    // let scriptElement = document.createElement("script");
                    // scriptElement.src = script;
                    // document.getElementById("parent").appendChild(scriptElement);
                    scriptsHtml += "<script type='text/javascript' src='" + script + "'></script>";
                });

                let frame = document.getElementById("gameFrame").contentWindow.document;
                frame.open();
                frame.write("<html><head></head><body><div id='parent' style='width: 100%; height:400px'></div>" + scriptsHtml + "</body></html>");
                frame.close();
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        // let frame = document.getElementById("parent").contentWindow.document;
        // frame.open();
        // frame.write()
        // frame.close();
        // document.getElementById("parent").innerHTML = "";
    }

    render() {
        return (
            <div>
                <iframe id="gameFrame" src="about:blank" width="100%">

                </iframe>
                {/*<div id="parent">*/}

                {/*</div>*/}
                <div>
                    <BackButton href="/lines"/>
                </div>
            </div>
        );
    }
}

export default LinesShowView;