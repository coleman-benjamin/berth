import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Legend from "./components/views/LegendView.jsx";
import Welcome from "./components/views/WelcomeView.jsx";
import LinesIndex from "./components/views/LinesIndexView.jsx";
import LinesShow from "./components/views/LinesShowView.jsx";
import About from "./components/views/AboutView.jsx";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Legend} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/lines" component={LinesIndex} />
            <Route path="/lines/:id" component={LinesShow} />
            <Route exact path="/about" component={About} />
        </div>
    </Router>
, document.getElementById('root'));