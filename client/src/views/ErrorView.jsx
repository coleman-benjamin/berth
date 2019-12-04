import React from "react";
import BackButton from "@/buttons/BackButton.jsx";

class ErrorView extends React.Component {
	render() {
		return (
			<div id="fiveHundad">
				<h1>Broke it</h1>
				<p>Something really broke, but not all is broken.</p>
				<BackButton onClick={this.props.clearHandler} />
			</div>
		)
	}
}

export default ErrorView;