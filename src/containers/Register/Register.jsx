import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register, resetRedirect } from '../../actions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: ''
    };

    this.redirect = this.redirect.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirect() {
    if (this.props.redirect) {
      this.props.resetRedirect();
      return true;
    }

    return false;
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'first_name':
        return this.setState({
          first_name: value
        });
      case 'last_name':
        return this.setState({
          last_name: value
        });
      case 'email':
        return this.setState({
          email: value
        });
      case 'username':
        return this.setState({
          username: value
        });
      case 'password':
        return this.setState({
          password: value
        });
      default:
        return;
    }
  }

  handleSubmit(e) {
    const { first_name, last_name, email, username, password } = this.state;
    const newUser = { first_name, last_name, email, username, password };

    e.preventDefault();
    this.props.register(newUser);

    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: ''
    });
  }

  render() {
    if (this.redirect()) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <form>
          <div>
            <label htmlFor="first_name">First Name:</label>
          </div>
          <input
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleInputOnChange}
          />

          <div>
            <label htmlFor="last_name">Last Name:</label>
          </div>
          <input
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleInputOnChange}
          />

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
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputOnChange}
          />

          <div>
            <button onClick={this.handleSubmit}>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    redirect: state.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: newUser => {
      dispatch(register(newUser));
    },
    resetRedirect: () => {
      dispatch(resetRedirect());
    }
  };
};

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default Register;
