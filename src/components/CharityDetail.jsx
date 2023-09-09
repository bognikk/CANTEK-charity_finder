import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./CharityDetail.scss";

const apiKey = process.env.REACT_APP_KEY;
const baseUrl = process.env.REACT_APP_URL;

const CharityDetail = ({ searchTerm }) => {
	const { id } = useParams();
	const [charity, setCharity] = useState(null);
	const [favCharities, setFavCharities] = useState([]);

	useEffect(() => {
		axios
			.get(`${baseUrl}/${searchTerm}?apiKey=${apiKey}`)
			.then((response) => {
				const selectedCharity = response.data.nonprofits.find(
					(c) => c.ein.toString() === id.toString()
				);
				setCharity(selectedCharity);
			})
			.catch((error) => {
				console.error("Error fetching charity details:", error);
			});
	}, [id, searchTerm]);

	const addToFavorite = () => {
		// if (!favCharities.some((item) => item.ein === charity.ein)) {
		setFavCharities([...favCharities, charity]);
		localStorage.setItem("favoriteCharities", JSON.stringify([charity]));
		console.log(favCharities);
		console.log(charity);

		// }
	};

	if (!charity) {
		return <div>There is no charity you are searching for.</div>;
	}

	return (
		<div className="charityDetail">
			<div className="charityDetail_image">
				<img src={charity.coverImageUrl} alt="" />
			</div>
			<div className="charityDetail_title">
				{charity.logoUrl && <img src={charity.logoUrl} alt="charity logo" />}
				<h2>{charity.name}</h2>
				<button onClick={addToFavorite} className="button">
					Add To Favorites
				</button>
			</div>
			<div className="charityDetail_description">
				{charity.description
					? charity.description
					: "This charity does not have a description."}
			</div>
			<a className="button" href={charity.profileUrl}>
				Check it in Every.org
			</a>
		</div>
	);
};

export default CharityDetail;
