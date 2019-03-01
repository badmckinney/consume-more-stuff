import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './ItemDetail.scss';
import { loadSingleItem } from '../../actions';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

componentWillMount(){
  const item = this.props.match.params.id
  this.props.loadItem(item);
}

  
  render() {
    if (this.redirect()) {
      return <Redirect to="/items/detail" />;
    }
    return (
      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-name">
            <h3> {this.props.name} </h3>
          </div>

          <div className="detail-price">
            <h3> ${this.props.price} </h3>
          </div>
        </div>

        <div className="detail-image">
          <img alt={this.props.name}> {this.props.image} </img>
        </div>

        <div className="detail-wrapper">
          <div className="detail">
            <p>Manufacurer: {this.props.manufacturer} </p>
          </div>

          <div className="detail">
            <p>Model: {this.props.model} </p>
          </div>

          <div className="detail">
            <p> Dimensions </p>
            <p>
              L: {this.props.length} W:{this.props.width} H:{this.props.height}
            </p>
          </div>

          <div className="detail">
            <p> Additional information</p>
            <p> {this.props.notes} </p>
          </div>

          <div className="detail">
            <p> Views: {this.props.view} </p>
          </div>
        </div>

        <div className="detail-description">
          <div>{this.props.description}</div>
        </div>
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
    loadItem: item => {
      dispatch(loadSingleItem(item));
    }
  };
};

ItemDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);

export default ItemDetail;
