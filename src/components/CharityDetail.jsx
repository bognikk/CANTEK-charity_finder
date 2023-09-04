// CharityDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
const apiKey = process.env.EVERY_ORG_KEY;
const baseUrl = process.env.EVERY_ORG_URL;

function CharityDetail({ match }) {
	const [charity, setCharity] = useState(null);

	useEffect(() => {
		const charityId = match.params.id;

		axios
			.get(`${baseUrl}${apiKey}/charities/${charityId}`)
			.then((response) => {
				setCharity(response.data);
			})
			.catch((error) => {
				console.error("Error fetching charity details:", error);
			});
	}, [match.params.id]);

	if (!charity) {
		return <div>No charities found.</div>;
	}

	return (
		<div>
			<h2>{charity.name}</h2>
			<p>{charity.description}</p>
		</div>
	);
}

export default CharityDetail;
