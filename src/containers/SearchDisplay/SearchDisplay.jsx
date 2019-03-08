import React, { Component } from 'react';
import { searchItems } from '../../actions';
import { connect } from 'react-redux';
import ItemList from '../../components/ItemList';
import './SearchDisplay.scss';

class SearchDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { isError: false };
  }

  componentDidMount() {
    const term = this.props.match.params.term;
    this.props.searchItems(term).then(data => {
      if (!data) {
        return this.setState({ isError: true });
      }

      return this.setState({ isError: false });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.term !== prevProps.match.params.term) {
      const term = this.props.match.params.term;
      this.props.searchItems(term).then(data => {
        if (!data) {
          return this.setState({ isError: true });
        }

        return this.setState({ isError: false });
      });
    }
  }

  render() {
    if (this.state.isError) {
      return (
        <div className="search-Display"> error fetching search results </div>
      );
    }

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
