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

    this.form = React.createRef();
    this.validate = this.validate.bind(this);
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

  validate() {
    return this.form.current.reportValidity()
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

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const editedProfile = this.state;

    if (!this.validate()) {
      return
    }

    e.preventDefault();
    this.props.editProfile(editedProfile).then(data => {
      if (!data) {
        return this.setState({ isError: true });
      }

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
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputOnChange}
              required
            />

            <div>
              <label htmlFor="username">Username:</label>
            </div>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputOnChange}
              required
              pattern="[A-Za-z0-9_]{6,30}"
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
              required
              pattern="[A-Za-z]{1,30}"
            />

            <div>
              <label htmlFor="last-name">Last Name:</label>
            </div>
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputOnChange}
              required
              pattern="[A-Za-z]{1,30}"
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
