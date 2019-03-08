import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProfileEdit.scss';

import {
  getProfile,
  editProfile,
  checkUniqueEmail,
  checkUniqueUsername
} from '../../actions';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      isEmailUnique: false,
      isUsernameUnique: false,
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      touched: {
        email: false,
        username: false
      }
    };

    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.checkUniqueEmail = this.checkUniqueEmail.bind(this);
    this.checkUniqueUsername = this.checkUniqueUsername.bind(this);
    this.makeEmailSpanClassName = this.makeEmailSpanClassName.bind(this);
    this.makeUsernameSpanClassName = this.makeUsernameSpanClassName.bind(this);
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
    return this.form.current.reportValidity();
  }

  error() {
    if (this.state.isError) {
      return <div className="error">Could not edit profile</div>;
    }

    return <></>;
  }

  makeEmailSpanClassName() {
    let className;

    this.state.touched.email ? (className = 'show') : (className = 'hide');

    this.state.isEmailUnique
      ? (className += ' valid')
      : (className += ' invalid');

    return className;
  }

  makeUsernameSpanClassName() {
    let className;

    this.state.touched.username ? (className = 'show') : (className = 'hide');

    this.state.isUsernameUnique
      ? (className += ' valid')
      : (className += ' invalid');

    return className;
  }

  checkUniqueEmail(e) {
    const email = e.target.value;

    this.setState({
      touched: { ...this.state.touched, email: true }
    });

    if (this.state.email === '') {
      this.setState({
        touched: { ...this.state.touched, email: false }
      });
    }

    this.props.checkUniqueEmail(email).then(exists => {
      if (exists) {
        return this.setState({ isEmailUnique: true });
      }

      return this.setState({ isEmailUnique: false });
    });
  }

  checkUniqueUsername(e) {
    const username = e.target.value;

    this.setState({
      touched: { ...this.state.touched, username: true }
    });

    if (this.state.email === '') {
      this.setState({
        touched: { ...this.state.touched, email: false }
      });
    }

    this.props.checkUniqueUsername(username).then(exists => {
      if (exists) {
        return this.setState({ isUsernameUnique: true });
      }

      return this.setState({ isUsernameUnique: false });
    });
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const editedProfile = this.state;

    if (!this.validate()) {
      return;
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
          <div className="error">You must be logged in to do that!</div>
        </div>
      );
    }

    return (
      <div className="edit-profile-container">
        {this.error()}
        <form className="edit-profile">
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            value={this.state.first_name}
            onChange={this.handleInputOnChange}
            required
            pattern="[A-Za-z]{1,30}"
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={this.state.last_name}
            onChange={this.handleInputOnChange}
            required
            pattern="[A-Za-z]{1,30}"
          />

          <div className="input-container">
            <input
              className="nested-input"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputOnChange}
              onKeyUp={this.checkUniqueEmail}
              required
            />
            <span className={this.makeEmailSpanClassName()}>
              {this.state.isEmailUnique ? 'Available!' : 'Taken'}
            </span>
          </div>

          <div className="input-container">
            <input
              className="nested-input"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputOnChange}
              onKeyUp={this.checkUniqueUsername}
              required
              pattern="[A-Za-z0-9_]{6,30}"
            />
            <span className={this.makeUsernameSpanClassName()}>
              {this.state.isUsernameUnique ? 'Available!' : 'Taken'}
            </span>
          </div>

          <div className="button-container">
            <Link to="/password"><div>Change password</div></Link>
            <button className="btn" onClick={this.handleSubmit}>Edit Profile</button>
          </div>
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
    editProfile: editedProfile => dispatch(editProfile(editedProfile)),
    checkUniqueEmail: email => dispatch(checkUniqueEmail(email)),
    checkUniqueUsername: username => dispatch(checkUniqueUsername(username))
  };
};

ProfileEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);

export default ProfileEdit;
