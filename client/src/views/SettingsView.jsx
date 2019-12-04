import React from "react";
import BackButton from "@/buttons/BackButton.jsx";

class SettingsView extends React.Component {
	render() {
		return (
			<div id="settings">
				<BackButton href="/" />
			</div>
		)
	}
}

export default SettingsView;