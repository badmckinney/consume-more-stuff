import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../../components/ItemList';
import { fetchItems } from '../../actions';
import { withRouter } from 'react-router-dom';

import './Category.scss';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const category = this.props.match.params.category;
    this.props.getItems(category);
  }

  render() {
    return (
      <div className="category">
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
    getItems: category => {
      dispatch(fetchItems(category));
    }
  };
};

Category = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Category));

export default Category;
