import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Legend from "./components/views/LegendView.jsx";
import Welcome from "./components/views/WelcomeView.jsx";
import LinesIndex from "./components/views/LinesIndexView.jsx";
import InteractionsIndex from "./components/views/InteractionsIndexView.jsx";
import LinesShow from "./components/views/LinesShowView.jsx";
import Settings from "./components/views/SettingsView.jsx";
import About from "./components/views/AboutView.jsx";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Legend} />
            <Route path="/welcome" component={Welcome} />
            <Route exact path="/lines" component={LinesIndex} />
            <Route path="/lines/:id" component={LinesShow} />
            <Route exact path="/interactions" component={InteractionsIndex} />
            <Route path="/settings" component={Settings} />
            <Route path="/about" component={About} />
        </Switch>
    </Router>, document.querySelector('#root')
);