import React, { useState } from "react";

import "./Search.scss";

const Search = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchTerm);
		setSearchTerm("");
	};

	return (
		<div className="search">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search for charities..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button disabled={!searchTerm ? "disabled" : ""} type="submit">
					Search
				</button>
			</form>
		</div>
	);
};

export default Search;
