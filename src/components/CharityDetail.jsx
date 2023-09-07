import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const apiKey = process.env.REACT_APP_KEY;
const baseUrl = process.env.REACT_APP_URL;

const CharityDetail = ({ searchTerm }) => {
	const { id } = useParams();
	const [charity, setCharity] = useState(null);

	useEffect(() => {
		axios
			.get(`${baseUrl}/${searchTerm}?apiKey=${apiKey}`)
			.then((response) => {
				const selectedCharity = response.data.nonprofits.find(
					(c) => c.ein.toString() === id.toString()
				);
				// console.log(response.data.nonprofits);
				// console.log(selectedCharity);
				setCharity(selectedCharity);
			})
			.catch((error) => {
				console.error("Error fetching charity details:", error);
			});
	}, [id, searchTerm]);

	if (!charity) {
		return <div>There is no charity you are searching for.</div>;
	}

	return (
		<div>
			<h2>{charity.name}</h2>
			<p>{charity.description}</p>
		</div>
	);
};

export default CharityDetail;
