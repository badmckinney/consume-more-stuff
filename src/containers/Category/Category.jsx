import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../../components/ItemList';
import { fetchItemsByCategory, fetchItemsAll } from '../../actions';
import { withRouter } from 'react-router-dom';

import './Category.scss';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const category = this.props.match.params.category;

    if (category === 'all') {
      return this.props.getItemsAll();
    }

    this.props.getItemsByCategory(category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      const category = this.props.match.params.category;

      if (category === 'all') {
        return this.props.getItemsAll();
      }

      this.props.getItemsByCategory(category);
    }
  }

  render() {
    return (
      <div className="category-container">
        <ItemList items={this.props.items} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.items };
};

const mapDispatchToProps = dispatch => {
  return {
    getItemsByCategory: category => dispatch(fetchItemsByCategory(category)),
    getItemsAll: () => dispatch(fetchItemsAll())
  };
};

Category = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Category)
);

export default Category;
