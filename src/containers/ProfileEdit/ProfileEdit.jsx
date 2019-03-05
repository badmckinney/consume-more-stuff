import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProfileEdit.scss';

import { getProfile, editProfile } from '../../actions';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      email: '',
      username: '',
      first_name: '',
      last_name: ''
    };

    this.error = this.error.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }

    return this.setState({
      email: this.props.profile.email,
      username: this.props.profile.username,
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name
    });
  }

  error() {
    if (this.state.isError) {
      return <div className="error">error editing profile</div>;
    }

    return <></>;
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'email':
        return this.setState({ email: value });
      case 'username':
        return this.setState({ username: value });
      case 'first_name':
        return this.setState({ first_name: value });
      case 'last_name':
        return this.setState({ last_name: value });
      default:
        return;
    }
  }

  handleSubmit(e) {
    const editedProfile = this.state;

    e.preventDefault();
    this.props.editProfile(editedProfile).then(data => {
      if (!data) {
        return this.setState({ isError: true });
      }
      console.log('hit');
      this.setState({ isError: false });
      return this.props.history.push('/profile');
    });
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <div className="profile-edit-page">
          <div className="error">You must be logged in to edit profile</div>
        </div>
      );
    }

    return (
      <div className="profile-edit-page">
        {this.error()}
        <form className="profile-edit">
          <div className="left">
            <div>
              <label htmlFor="email">Email:</label>
            </div>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInputOnChange}
            />

            <div>
              <label htmlFor="username">Username:</label>
            </div>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputOnChange}
            />

            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <Link to="/password">change password</Link>
          </div>

          <div className="right">
            <div>
              <label htmlFor="first-name">First Name:</label>
            </div>
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleInputOnChange}
            />

            <div>
              <label htmlFor="last-name">Last Name:</label>
            </div>
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputOnChange}
            />
          </div>

          <button onClick={this.handleSubmit}>Edit Profile</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile()),
    editProfile: editedProfile => dispatch(editProfile(editedProfile))
  };
};

ProfileEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);

export default ProfileEdit;
