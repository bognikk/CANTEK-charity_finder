import React from "react";

function CharityList({ charities, onItemClick }) {
	return (
		<ul>
			{charities.map((charity) => (
				<li key={charity.id} onClick={() => onItemClick(charity.id)}>
					{charity.name}
				</li>
			))}
		</ul>
	);
}

export default CharityList;
