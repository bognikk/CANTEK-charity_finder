import React, { useState } from "react";

const Search = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchTerm);
		setSearchTerm("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search for charities..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default Search;
