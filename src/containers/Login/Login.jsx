import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

        <button onClick={this.handleSubmit}>Login</button>
      </form>
    );
  }
}

// could use mapState to props here to update
// state with login error messages to display

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      dispatch(login(user));
    }
  };
};

Login = connect(
  null,
  mapDispatchToProps
)(Login);

export default Login;
