import React, { useState } from 'react'

const inputStyles = {
	width: '300px', 
	padding: '10px',
	margin: '20px auto', 
	borderRadius: '5px',
	border: 'none',
	boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
	backgroundColor: '#333', 
	color: '#fff', 
	outline: "none"
}

const SearchBar = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	function handleChange(event) {
		setQuery(event.target.value);
		onSearch(event.target.value);
	}

	return (
		<>
			<input type="text" placeholder='Search Movies....' value={query} onChange={handleChange} style={inputStyles} />
		</>
	)
}

export default SearchBar