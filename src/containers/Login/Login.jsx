import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { Link } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      username: '',
      password: ''
    };

    this.error = this.error.bind(this);
    this.showMsg = this.showMsg.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.props.isRegisteredMsg) {
      this.props.toggleMsg('registered');
    }
  }

  error() {
    if (this.state.isError) {
      return <div className="error">Invalid username or password</div>;
    }

    return <></>;
  }

  showMsg() {
    if (this.props.isRegisteredMsg) {
      return (
        <div className="message-container">
          <div className="message">
            Your account has been created. Please log in here.
          </div>
        </div>
      );
    }

    return <></>;
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    return this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const user = this.state;

    e.preventDefault();

    this.props.login(user).then(data => {
      if (!data) {
        return this.setState({ isError: true });
      }

      this.setState({ isError: false });
      return this.props.history.push('/');
    });
  }

  render() {
    return (
      <div className="login-page">
        {this.error()}
        {this.showMsg()}
        <form>
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputOnChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputOnChange}
          />

          <div id="login-button-container">
            <button className="btn" onClick={this.handleSubmit}>
              Login
            </button>
          </div>

          <div className="register-here">
            Don't have an account?
            <Link to={'/register'}> Register here</Link>
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
