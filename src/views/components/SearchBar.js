const SearchBar = (props) => {
	return (
		<div className="search-bar">
			<form onSubmit={props.handleSubmit}>
				<input
					type="text"
					name="searchText"
					id="searchText"
					placeholder="Search places..."
					value={props.inputValue}
					onChange={props.getSearchInput}
					onFocus={(e) => {
						e.target.select();
					}}
				/>
			</form>
		</div>
	);
};

export default SearchBar;
