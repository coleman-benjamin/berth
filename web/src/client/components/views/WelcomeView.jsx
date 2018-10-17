import React from "react";
import BackButton from "../buttons/BackButton.jsx";

class Welcome extends React.Component{
    render() {
        return (
            <div>
                <div className="lodger" id="first">
                    <h1>WELCOME</h1>
                </div>
                <div className="lodger" id="second">
                    <h1>WELCOME</h1>
                </div>
                <div className="lodger" id="third">
                    <h1>WELCOME</h1>

                    <div id="door">
                        <div id="enter"><a>_</a></div>
                    </div>
                </div>
                <div className="lodger" id="fourth">
                    <h1>WELCOME</h1>
                </div>

                <div>
                    <BackButton href="/"/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const steps = ['#first', '#second', '#third', '#fourth'];
        let counter = 2;

        function enter() {
            counter ++;
            if (counter > 3) {
                counter = 0;
            }
            $('#door').detach().appendTo(steps[counter]);
        }

        $('#enter').click(enter);
    }
}

export default Welcome;