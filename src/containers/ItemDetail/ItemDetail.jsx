import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ItemDetail.scss';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="detail-container">
        <div className="detail-image">
          <img>{this.props.image}</img>
        </div>

        <div className="detail-wrapper">
          <div className="detail">
            <div>
              <label> Name: </label>
            </div>
            <div>{this.props.name}</div>
          </div>

          <div className="detail">
            <div>
              <label> Description </label>
            </div>
            <div>{this.props.description}</div>
          </div>

          <div className="detail">
            <div>
              <label> Price: </label>
            </div>
            <div>{this.props.price}</div>
          </div>

          <div className="detail">
            <div>
              <label> Manufacturer: </label>
            </div>
            <div>{this.props.manufacturer}</div>
          </div>

          <div className="detail">
            <div>
              <label> Model: </label>
            </div>
            <div> {this.props.model} </div>
          </div>

          <div className="detail">
            <div>
              <label> Length: </label>
            </div>
            <div> {this.props.length} </div>
          </div>

          <div className="detail">
            <div>
              <label> Width: </label>
            </div>
            <div> {this.props.width} </div>
          </div>

          <div className="detail">
            <div>
              <label> Height: </label>
            </div>
            <div> {this.props.height} </div>
          </div>

          <div className="detail">
            <div>
              <label> Notes: </label>
            </div>
            <div> {this.props.detail} </div>
          </div>

          <div className="detail">
            <div>
              <label> Views: </label>
            </div>
            <div> {this.props.views} </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOpenDetail: item => {
      dispatch(onOpenDetail(item))
    }
  };
};

ItemDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);

export default ItemDetail;
