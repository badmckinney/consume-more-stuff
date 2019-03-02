import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../../components/ItemList';
import { searchItems } from '../../actions';
import './SearchDisplay.scss';

class SearchDisplay extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const term = this.props.match.params.term;
    this.props.searchItems(term);
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

const mapDispatchToProps = dispatch => {
  return {
    searchItems: term => {
      return dispatch(searchItems(term));
    }
  };
};

SearchDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDisplay);

export default SearchDisplay;
