import React from "react";
import { Link } from 'react-router-dom';

class BackButton extends React.Component {
	render() {
		return (
			<div id="btn_back" className="red-btn bottom-btn">
				<Link to={this.props.href || document.referrer}>Back</Link>
			</div>
		);
	}
}

export default BackButton;