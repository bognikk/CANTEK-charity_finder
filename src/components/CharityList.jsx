import React from "react";
import { Link } from "react-router-dom";

const CharityList = ({ charities }) => {
	return (
		<div>
			<h2>Charities</h2>
			{charities.length === 0 && <div>No charities found.</div>}
			<ul>
				{charities.map((charity) => (
					<li key={charity.ein * 0.2}>
						<Link to={`/charity/${charity.ein}`}>
							{charity.name}
							{charity.location}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CharityList;
