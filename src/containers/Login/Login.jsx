import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      username: '',
      password: ''
    };

    this.error = this.error.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  error() {
    if (this.state.isError) {
      return <div className="error">Invalid username or password</div>;
    }

    return <></>;
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
    const user = this.state;

    e.preventDefault();

    this.props.login(user).then(data => {
      if (!data) {
        return this.setState({
          isError: true
        });
      }

      this.setState({
        isError: false
      });

      return this.props.history.push('/');
    });
  }

  render() {
    return (
      <div className="login-page">
        {this.error()}
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      return dispatch(login(user));
    }
  };
};

Login = connect(
  null,
  mapDispatchToProps
)(Login);

export default Login;
