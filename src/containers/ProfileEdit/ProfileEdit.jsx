import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProfileEdit.scss';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      email: '',
      username: '',
      firstName: '',
      lastName: ''
    };
  }

  componentDidMount() {
    // this.props.getProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }

    return this.setState({
      email: this.props.profile.email,
      username: this.props.profile.username,
      firstName: this.props.profile.first_name,
      lastName: this.props.profile.last_name
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
      case 'firstName':
        return this.setState({ firstName: value });
      case 'lastName':
        return this.setState({ lastName: value });
      default:
        return;
    }
  }

  handleSubmit(e) {
    const editedProfile = this.state;

    e.preventDefault();
    this.props.editProfile(editedProfile);
  }

  render() {
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
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputOnChange}
            />

            <div>
              <label htmlFor="last-name">Last Name:</label>
            </div>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
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
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getProfile: () => dispatch(getProfile())
  };
};

ProfileEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);

export default ProfileEdit;
