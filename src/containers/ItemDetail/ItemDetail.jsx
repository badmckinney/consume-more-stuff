import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ItemDetail.scss';
import { loadSingleItem } from '../../actions';
import { Link } from 'react-router-dom';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const item = this.props.match.params.id;
    this.props.loadItem(item);
  }

  render() {
    const detail = this.props.detail;
    if (detail) {
      if (this.props.detail.item.createdBy === this.props.currentUser) {
        return (
          <div className="detail-container">
            <div className="detail-header">
              <div className="detail-name">
                <h3> {detail.item.name} </h3>
              </div>

              <div className="detail-price">
                <h3> ${detail.item.price} </h3>
              </div>
            </div>

            <div className="detail-image">
              <img alt={detail.item.name} src="" />
            </div>

            <div className="detail-wrapper">
              <div className="detail">
                <p>Manufacurer: {detail.item.manufacturer} </p>
              </div>

              <div className="detail">
                <p>Model: {detail.item.model} </p>
              </div>

              <div className="detail">
                <p> Dimensions </p>
                <p>
                  L: {detail.item.length} W:{detail.item.width} H:
                  {detail.item.height}
                </p>
              </div>

              <div className="detail">
                <p> Additional information</p>
                <p> {detail.notes} </p>
              </div>

              <div className="detail">
                <p> Views: {detail.item.views} </p>
              </div>
            </div>

            <div className="detail-description">
              <div>{detail.item.description}</div>
            </div>

            <Link to={`/items/${this.state.id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
        );
      }
      return (
        <div className="detail-container">
          <div className="detail-header">
            <div className="detail-name">
              <h3> {detail.item.name} </h3>
            </div>

            <div className="detail-price">
              <h3> ${detail.item.price} </h3>
            </div>
          </div>

          <div className="detail-image">
            <img alt={detail.item.name} src="" />
          </div>

          <div className="detail-wrapper">
            <div className="detail">
              <p>Manufacurer: {detail.item.manufacturer} </p>
            </div>

            <div className="detail">
              <p>Model: {detail.item.model} </p>
            </div>

            <div className="detail">
              <p> Dimensions </p>
              <p>
                L: {detail.item.length} W:{detail.item.width} H:
                {detail.item.height}
              </p>
            </div>

            <div className="detail">
              <p> Additional information</p>
              <p> {detail.item.notes} </p>
            </div>

            <div className="detail">
              <p> Views: {detail.item.views} </p>
            </div>
          </div>

          <div className="detail-description">
            <div>{detail.item.description}</div>
          </div>
        </div>
      );
    }
    return (<> </>)
  }
}

const mapStateToProps = state => {
  return {
    detail: state.detail,
    currentUser: state.currentUser
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
