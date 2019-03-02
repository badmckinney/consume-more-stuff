import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      username: '',
      password: ''
    };

    this.login = this.login.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  login(user) {
    axios.post('/api/login', user).then(res => {
      if (res.data.success) {
        this.props.dispatchLogin(res.data.username);
        this.setState({
          redirect: true
        });
      }

      //error handle
    });
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'username':
        return this.setState({ username: value });
      case 'password':
        return this.setState({ password: value });
      default:
        return;
    }
  }

  handleSubmit(e) {
    const { username, password } = this.state;
    const user = { username, password };

    e.preventDefault();
    this.login(user);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <form>
        <div>Username:</div>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleInputOnChange}
        />

        <div>Password:</div>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputOnChange}
        />

        <div>
          <button onClick={this.handleSubmit}>Login</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogin: user => {
      dispatch(login(user));
    }
  };
};

Login = connect(
  null,
  mapDispatchToProps
)(Login);

export default Login;
