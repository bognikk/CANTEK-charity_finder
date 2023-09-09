import React from "react";
import { Link } from "react-router-dom";

import "./CharityList.scss";

const CharityList = ({ charities }) => {
	return (
		<div className="charityList">
			<h2>Charities</h2>
			{charities.length === 0 && <div>No charities found.</div>}
			<ul>
				{charities.map((charity) => (
					<li className="charityItem" key={charity.ein + charity.id}>
						<div>
							{charity.logoUrl && (
								<img src={charity.logoUrl} alt="charity logo" />
							)}
							<h3>{charity.name}</h3>
						</div>

						<Link className="button" to={`/charity/${charity.ein}`}>
							View More
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CharityList;
