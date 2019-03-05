import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ItemDetail.scss';
import { loadSingleItem } from '../../actions';
import { Link } from 'react-router-dom';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false
    };

    this.editButton = this.editButton.bind(this);
  }

  componentDidMount() {
    const item = this.props.match.params.id;
    this.props.loadItem(item).then(data => {
      if (!data) {
        return this.setState({ notFound: true });
      }
    });
  }

  editButton() {
    if (this.props.item.createdBy === this.props.currentUser) {
      return (
        <Link to={`/items/${this.props.item.id}/edit`}>
          <button>Edit</button>
        </Link>
      );
    }

    return <></>;
  }

  render() {
    const item = this.props.item;

    if (this.state.notFound) {
      return <div className="error">Item not found</div>;
    }

    return (
      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-name">
            <h3> {item.name} </h3>
          </div>

          <div className="detail-price">
            <h3> ${item.price} </h3>
          </div>
        </div>
        <div className="detail-image">
          <img alt={item.name} src="" />
        </div>
        <div className="detail-wrapper">
          <div className="item">
            <p>Manufacturer: {item.manufacturer} </p>
          </div>

          <div className="detail">
            <p>Model: {item.model} </p>
          </div>

          <div className="detail">
            <p> Dimensions </p>
            <p>
              L: {item.length} W:{item.width} H:
              {item.height}
            </p>
          </div>

          <div className="detail">
            <p> Additional information</p>
            <p> {item.notes} </p>
          </div>

          <div className="detail">
            <p> Views: {item.views} </p>
          </div>
        </div>
        <div className="detail-description">
          <div>{item.description}</div>
        </div>
        {this.editButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.item,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadItem: item => dispatch(loadSingleItem(item))
  };
};

ItemDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);

export default ItemDetail;
