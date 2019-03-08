import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfile, getUsersItems, editItem } from '../../actions';
import ProfileItemList from '../../components/ProfileItemList';
import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.toggleStatus = this.toggleStatus.bind(this);
    this.forSale = this.forSale.bind(this);
    this.sold = this.sold.bind(this);
  }

  componentDidMount() {
    this.props.getProfile();
    this.props.getUsersItems();
  }

  toggleStatus(e) {
    e.preventDefault();

    const id = e.target.dataset.id;
    const status_id = e.target.dataset.status;

    if (status_id !== '1') {
      return this.props.editItem({ id: id, status_id: 1 }).then(data => {
        return this.props.history.push(`/items/${id}`);
      });
    } else {
      return this.props.editItem({ id: id, status_id: 3 }).then(data => {
        return this.props.history.push(`/items/${id}`);
      });
    }
  }

  forSale() {
    return this.props.items.filter(item => item.status_id === 1);
  }

  sold() {
    return this.props.items.filter(item => item.status_id === 3);
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <div className="profile-info">
          <div className="error">You must be logged in to do that!</div>
        </div>
      );
    }

    const profile = this.props.profile;

    return (
      <>
        <div className="title">My Account</div>
        <div className="profile-container">
          <div className="user-info-container">
            <div className="left">
              <div className="email">Email: {profile.email}</div>
              <div className="username">Username: {profile.username}</div>
              <Link to="/password"><button className="btn">Change Password</button></Link>
            </div>

            <div className="right">
              <div className="first-name">First Name: {profile.first_name}</div>
              <div className="last-name">Last Name: {profile.last_name}</div>
              <Link to="/profile/edit">
                <button className="btn">Edit Profile</button>
              </Link>
            </div>
          </div>
          <div className="status-container">
            <div className="columns-container">
              <div className="status-column">Status</div>
              <div className="manage-column">Manage</div>
              <div className="title-column">Post Title</div>
              <div className="category-column">Category</div>
              <div className="date-column">Date Posted</div>
              <div className="update-column">Last Updated At</div>
              <div className="views-column">views</div>
              <div className="id-column">Post Id</div>
            </div>
            <ProfileItemList
              items={this.forSale()}
              toggleStatus={this.toggleStatus}
            />
            <ProfileItemList
              items={this.sold()}
              toggleStatus={this.toggleStatus}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    items: state.items,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile()),
    getUsersItems: () => dispatch(getUsersItems()),
    editItem: item => dispatch(editItem(item))
  };
};

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default Profile;
