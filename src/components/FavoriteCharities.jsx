import React, { useEffect, useState } from "react";

function FavoriteCharities() {
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
						{charity.name}
						{/*Link to CharityDetail*/}
					</li>
				))}
			</ul>
		</div>
	);
}

export default FavoriteCharities;
