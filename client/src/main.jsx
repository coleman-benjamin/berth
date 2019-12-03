import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Legend from "@/views/LegendView.jsx";
import Welcome from "@/views/WelcomeView.jsx";
import GamesIndex from "@/views/GamesIndexView.jsx";
import GameViewParent from "@/views/GameViewParent.jsx";
import About from "@/views/AboutView.jsx";

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={Legend} />
			<Route path="/welcome" component={Welcome} />
			<Route exact path="/games" component={GamesIndex} />
			<Route path="/games/:id" component={GameViewParent} />
			<Route path="/about" component={About} />
		</Switch>
	</Router>, document.querySelector('#root')
);