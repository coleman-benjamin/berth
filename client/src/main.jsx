import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorWrapperView from "@/views/ErrorWrapperView.jsx";
import NotFoundView from "@/views/NotFoundView.jsx";

import Legend from "@/views/LegendView.jsx";
import Welcome from "@/views/WelcomeView.jsx";
import GamesIndex from "@/views/GamesIndexView.jsx";
import GameViewParent from "@/views/GameViewParent.jsx";
import About from "@/views/AboutView.jsx";

ReactDOM.render(
	<Router>
		<ErrorWrapperView>
			<Switch>
				<Route exact path="/" component={Legend} />
				<Route path="/welcome" component={Welcome} />
				<Route exact path="/games" component={GamesIndex} />
				<Route path="/games/:id" component={GameViewParent} />
				<Route path="/about" component={About} />
				<Route path="" component={NotFoundView} />
			</Switch>
		</ErrorWrapperView>
	</Router>, document.querySelector('#root')
);