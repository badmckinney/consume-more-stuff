import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from '../Item';
import './TopList.scss';
import { loadTop } from '../../actions';

class TopList extends Component {

  componentWillMount() {
    const category = this.props.category;
    this.props.loadTop(category);
  };

  render() {
    const items = [];
    const category = this.props.category;
    if (this.props.topTen[category]) {
      this.props.topTen[category].forEach((item) => {
        items.push((<Item key={item.id} item={item} />));
      });
    }
    return (
      <div className={`top-${this.props.category}`}>
        {items}
      </div>
    )
  };
};

const mapStateToProps = state => {

  return { topTen: state.topTen };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTop: category => {
      dispatch(loadTop(category));
    }
  };
};

TopList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopList);

export default TopList;