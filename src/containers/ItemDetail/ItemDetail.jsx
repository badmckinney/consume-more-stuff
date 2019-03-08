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
    this.timestampsDetail = this.timestampsDetail.bind(this);
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

  timestampsDetail() {
    const item = this.props.item;
    const localCreatedAt = new Date(item.created_at);
    const localUpdatedAt = new Date(item.updated_at);

    if (item.created_at === item.updated_at) {
      return (
        <div className="created">
          Posted: <Moment fromNow>{localCreatedAt}</Moment>
        </div>
      );
    }

    return (
      <>
        <div className="created">
          posted: <Moment fromNow>{localCreatedAt}</Moment>
        </div>
        <div className="updated">
          updated: <Moment fromNow>{localUpdatedAt}</Moment>
        </div>
      </>
    );
  }

  render() {
    const item = this.props.item;
    const localCreatedAt = new Date(item.created_at);

    if (this.state.notFound) {
      return <div className="error">Item not found</div>;
    }

    return (
      <div className="detail-container">
        <div className="header-container">
          <div className="header-left">
            <h1> {item.name} –</h1>
            <h2> {item.price ? `$${item.price}` : ''} </h2>
            <h4>
              Posted <Moment fromNow>{localCreatedAt}</Moment>
            </h4>
          </div>
          {this.editButton()}
        </div>
        <div className="content-wrapper">
          <div className="detail-left">
            <img alt={item.name} src={item.image} />
            <div className="description">{item.description}</div>
          </div>
          <div className="detail-right">
            <div className="detail">
              <p>Manufacturer: </p>
              <p>{item.manufacturer}</p>
            </div>

            <div className="detail">
              <p>Model:</p>
              <p> {item.model} </p>
            </div>

            <div className="detail"><p>Length:</p> {item.length}</div>
            <div className="detail"><p>Width:</p> {item.width}</div>
            <div className="detail"><p>Height:</p> {item.height}</div>

            <div className="detail">
              <p> Additional notes: </p>
              <p> {item.notes} </p>
            </div>
          </div>
        </div>
        <div className="additional-details">
          <div className="id">post id: {item.id}</div>
          {this.timestampsDetail()}
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
