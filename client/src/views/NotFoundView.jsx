import React from "react";
import BackButton from "@/buttons/BackButton.jsx";

class NotFoundView extends React.Component {
	render() {
		return (
			<div id="fourOhFour">
				<h1>Cannot be found</h1>
				<BackButton />
			</div>
		)
	}
}

export default NotFoundView;