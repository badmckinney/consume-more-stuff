import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../../components/ItemList';
import './SearchDisplay.scss';

class SearchDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search-display">
        <ItemList items={this.props.searchResults} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults
  };
};

SearchDisplay = connect(
  mapStateToProps,
  null
)(SearchDisplay);

export default SearchDisplay;
