import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, getUsersItems } from '../../actions';
import ItemList from '../../components/ItemList';
import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.forSale = this.forSale.bind(this);
    this.sold = this.sold.bind(this);
  }

  componentDidMount() {
    this.props.getProfile();
    this.props.getUsersItems();
  }

  forSale() {
    return this.props.items.filter(item => item.status_id === 1);
  }

  sold() {
    return this.props.items.filter(item => item.status_id === 3);
  }

  render() {
    return (
      <>
        <div>{this.props.profile.username}</div>

        <div className="forsale">
          Sale
          <ItemList items={this.forSale()} />
        </div>

        <div className="sold">
          SOLD
          <ItemList items={this.sold()} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile()),
    getUsersItems: () => dispatch(getUsersItems())
  };
};

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default Profile;
