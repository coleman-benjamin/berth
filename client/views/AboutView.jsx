import React from "react";
import BackButton from "../buttons/BackButton.jsx";

class AboutView extends React.Component {
    render() {
        return (
            <div>
                <p>This website is my catharsis.</p>
                <p>Somewhat of a design experiment, as well a place to showcase other graphical and/or musical experiments.</p>
                <p>The whole process is an ongoing experiment.</p>
                <p>It is built to be simple, both in code and in design.</p>
                <p>Slowly achieving great speed.</p>
                <p>Author : Benjamin Coleman</p>
                <p>Github : <a href="https://github.com/coleman-benjamin/berth">https://github.com/coleman-benjamin/berth</a></p>

                <div>
                    <BackButton href="/"/>
                </div>
            </div>
        );
    }
}

export default AboutView;