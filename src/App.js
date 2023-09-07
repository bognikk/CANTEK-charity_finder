import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Search from "./components/Search";
import CharityList from "./components/CharityList";
import CharityDetail from "./components/CharityDetail";
import FavoriteCharities from "./components/FavoriteCharities";
import { Link } from "react-router-dom";
import axios from "axios";

const apiKey = process.env.REACT_APP_KEY;
const baseUrl = process.env.REACT_APP_URL;

const App = () => {
	const options = ["animals", "humans", "environment", "pets"];
	const [charities, setCharities] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	if (!searchTerm) {
		const randomIndex = Math.floor(Math.random() * options.length);
		setSearchTerm(options[randomIndex]);
	}

	useEffect(() => {
		axios
			.get(`${baseUrl}/${searchTerm}?apiKey=${apiKey}`)
			.then((response) => {
				setCharities(response.data.nonprofits);
			})
			.catch((error) => {
				console.error("Error fetching charity details:", error);
			});
	}, [searchTerm]);

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm.toLowerCase());
		console.log(searchTerm.toLowerCase());
	};

	return (
		<Router>
			<div>
				<header>
					<h1>Charity Finder</h1>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/favorites">Favorites</Link>
							</li>
						</ul>
					</nav>
				</header>

				<main>
					<Switch>
						{/* Home Page */}
						<Route path="/" exact>
							<Search onSearch={handleSearch} />
							<CharityList charities={charities} />
						</Route>

						{/* Charity Detail Page */}
						<Route path="/charity/:id">
							<CharityDetail searchTerm={searchTerm} />
						</Route>

						{/* Favorites Page */}
						<Route path="/favorites">
							<FavoriteCharities />
						</Route>

						{/* Redirect to 404 for unknown routes */}
						<Redirect to="/404" />
					</Switch>
				</main>
			</div>
		</Router>
	);
};

export default App;
