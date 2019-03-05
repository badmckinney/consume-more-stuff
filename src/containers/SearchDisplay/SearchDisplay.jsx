import React, { Component } from 'react';
import { searchItems } from '../../actions';
import { connect } from 'react-redux';
import ItemList from '../../components/ItemList';

class SearchDisplay extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const term = this.props.match.params.term;
    this.props.searchItems(term);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.term !== prevProps.match.params.term) {
      const term = this.props.match.params.term;
      this.props.searchItems(term);
    }
  }

  render() {
    if (this.props.items.length === 0) {
      return <div className="search-Display"> no results found</div>;
    }

    return (
      <div className="search-display">
        <ItemList items={this.props.items} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchItems: term => dispatch(searchItems(term))
  };
};

SearchDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDisplay);

export default SearchDisplay;
