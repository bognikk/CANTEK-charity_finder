// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home";
import CharityDetail from "./components/pages/CharityDetail";
import Favorites from "./components/pages/Favorites";
import NotFound from "./components/pages/NotFound";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/charity/:id" component={CharityDetail} />
				<Route path="/favorites" component={Favorites} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
}

export default App;
