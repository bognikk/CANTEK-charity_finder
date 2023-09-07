import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoriteCharities = () => {
	const [favoriteCharities, setFavoriteCharities] = useState([]);

	useEffect(() => {
		const storedFavorites = localStorage.getItem("favoriteCharities");
		if (storedFavorites) {
			setFavoriteCharities(JSON.parse(storedFavorites));
		}
	}, []);

	return (
		<div>
			<h2>Favorite Charities</h2>
			<ul>
				{favoriteCharities.map((charity) => (
					<li key={charity.id}>
						<Link to={`/charity/${charity.id}`}>{charity.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FavoriteCharities;
