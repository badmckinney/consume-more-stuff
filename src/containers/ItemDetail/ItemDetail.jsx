import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSingleItem } from '../../actions';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './ItemDetail.scss';

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

      return this.setState({ notFound: false });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const item = this.props.match.params.id;
      this.props.loadItem(item).then(data => {
        if (!data) {
          return this.setState({ notFound: true });
        }

        return this.setState({ notFound: false });
      });
    }
  }

  editButton() {
    if (this.props.item.createdBy === this.props.currentUser) {
      return (
        <Link to={`/items/${this.props.item.id}/edit`}>
          <button className="btn">Edit</button>
        </Link>
      );
    }

    return <></>;
  }

  render() {
    const item = this.props.item;
    const localCreatedAt = new Date(item.created_at);

    if (this.state.notFound) {
      return <div className="error">Item not found</div>;
    }

    return (
      <div className="detail-container">
        {this.editButton()}
        <div className="header-container">
          <h3> {item.name} </h3>
          <h3> {item.price ? `$ ${item.price}` : ''} </h3>

          <h3>
            Posted <Moment fromNow>{localCreatedAt}</Moment>
          </h3>
        </div>
        <div className="content-wrapper">
          <div className="detail-image">
            <img alt={item.name} src={item.image} />
          </div>
          <div className="detail-wrapper">
            <div className="detail">
              <p>Manufacturer: </p>
              <p>{item.manufacturer}</p>
            </div>

            <div className="detail">
              <p>Model:</p>
              <p> {item.model} </p>
            </div>

            <div className="detail">Length: {item.length}</div>
            <div className="detail">Width: {item.width}</div>
            <div className="detail">Height: {item.height}</div>

            <div className="detail">
              <p> Additional information</p>
              <p> {item.notes} </p>
            </div>
          </div>
        </div>
        <div className="description-container">
          <div className="description">
            <div>{item.description}</div>
          </div>
        </div>
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
