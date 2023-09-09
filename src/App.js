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
import axios from "axios";

import "./App.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const apiKey = process.env.REACT_APP_KEY;
const baseUrl = process.env.REACT_APP_URL;

const App = () => {
	const options = [
		"animals",
		"humans",
		"environment",
		"pets",
		"aapi-led",
		"adoption",
		"afghanistan",
		"animals",
		"art",
		"athletics",
		"autism",
		"black-led",
		"buddhism",
		"cancer",
		"cats",
		"christianity",
		"climate",
		"conservation",
		"coronavirus",
		"culture",
		"dance",
		"disabilities",
		"disease",
		"dogs",
		"education",
		"environment",
		"filmandtv",
		"food-security",
		"freepress",
		"gender-equality",
		"health",
		"hinduism",
		"housing",
		"humans",
		"hurricane-ian",
		"immigrants",
		"indigenous-led",
		"indigenous-peoples",
		"islam",
		"judaism",
		"justice",
		"latine-led",
		"legal",
		"lgbt",
		"libraries",
		"mental-health",
		"museums",
		"music",
		"oceans",
		"parks",
		"poverty",
		"racial-justice",
		"radio",
		"refugees",
		"religion",
		"research",
		"science",
		"seniors",
		"space",
		"theater",
		"transgender",
		"ukraine",
		"veterans",
		"votingrights",
		"water",
		"wildfires",
		"wildlife",
		"women-led",
		"womens-health",
		"youth",
	];
	const [charities, setCharities] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [hero, setHero] = useState("");

	if (!searchTerm) {
		const randomIndex = Math.floor(Math.random() * options.length);
		setSearchTerm(options[randomIndex]);
	}

	useEffect(() => {
		axios
			.get(`${baseUrl}/${searchTerm}?apiKey=${apiKey}`)
			.then((response) => {
				const charities = response.data.nonprofits;
				setCharities(charities);

				const filteredCharities = [];
				for (const charity of charities) {
					if (charity.hasOwnProperty("coverImageUrl")) {
						filteredCharities.push(charity.coverImageUrl);
					}
				}
				const randomIndex = Math.floor(
					Math.random() * filteredCharities.length
				);
				setHero(filteredCharities[randomIndex]);
			})
			.catch((error) => {
				console.error("Error fetching charity details:", error);
			});
	}, [searchTerm]);

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm.toLowerCase());
	};

	return (
		<Router>
			<header>
				<h1>Charity Finder</h1>
				<nav>
					<ul>
						<li>
							<NavLink exact className="button" to="/">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? "button active" : "button"
								}
								to="/favorites"
							>
								Favorites
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>

			<main>
				<Switch>
					{/* Home Page */}
					<Route path="/" exact>
						<div className="hero-image">
							{hero && <img src={hero} alt="charity logo" />}
						</div>
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
		</Router>
	);
};

export default App;
