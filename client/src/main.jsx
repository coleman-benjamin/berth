import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorWrapper from "@/views/ErrorWrapperView.jsx";
import NotFound from "@/views/NotFoundView.jsx";

import Legend from "@/views/LegendView.jsx";
import Welcome from "@/views/WelcomeView.jsx";
import GamesIndex from "@/views/GamesIndexView.jsx";
import GameViewParent from "@/views/GameViewParent.jsx";
import Settings from "@/views/SettingsView.jsx";
import About from "@/views/AboutView.jsx";

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={Legend} />
			<Route path="/welcome" component={Welcome} />
			<Route exact path="/games" component={GamesIndex} />
			<Route path="/games/:id" component={GameViewParent} />
			<Route path="/about" component={About} />
			<Route path="/settings" component={Settings} />
			<Route path="" component={NotFound} />
		</Switch>
	</Router>, document.querySelector('#root')
);