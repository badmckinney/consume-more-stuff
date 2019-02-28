import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login, resetRedirect } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.redirect = this.redirect.bind(this);
    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirect() {
    if (this.props.redirect) {
      this.props.resetRedirect();
      return true;
    }

    return false;
  }

  handleUsernameOnChange(e) {
    const value = e.target.value;
    this.setState({
      username: value
    });
  }

  handlePasswordOnChange(e) {
    const value = e.target.value;
    this.setState({
      password: value
    });
  }

  handleSubmit(e) {
    const { username, password } = this.state;
    const user = { username, password };

    e.preventDefault();
    this.props.login(user);
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    if (this.redirect()) {
      return <Redirect to="/" />;
    }

    return (
      <form>
        <div>Username:</div>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleUsernameOnChange}
        />

        <div>Password:</div>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordOnChange}
        />

        <div>
          <button onClick={this.handleSubmit}>Login</button>
        </div>
      </form>
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
    login: user => {
      dispatch(login(user));
    },
    resetRedirect: () => {
      dispatch(resetRedirect());
    }
  };
};

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;
