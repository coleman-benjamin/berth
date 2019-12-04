import React from "react";

import NotFoundView from "@/views/NotFoundView.jsx";
import ErrorView from "@/views/ErrorView.jsx";

class ErrorWrapperView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true, error });
	}

	render() {
		if (this.state.hasError) {
			if (this.state.error.response && this.state.error.response.status === 404) {
				return <NotFoundView />
			} else {
				return <ErrorView />
			}
		} else {
			return this.props.children;
		}
	}
}

export default ErrorWrapperView;