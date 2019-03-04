import React from 'react';
import ItemList from '../ItemList';

const SearchDisplay = props => {
  const { searchResults } = props;
  return (
    <div className="search-display">
      <ItemList items={searchResults} />
    </div>
  );
};

export default SearchDisplay;
