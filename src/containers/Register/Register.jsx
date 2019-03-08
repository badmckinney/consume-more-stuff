import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { register, checkUniqueEmail, checkUniqueUsername } from '../../actions';
import { connect } from 'react-redux';
import './Register.scss';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      isEmailUnique: false,
      isUsernameUnique: false,
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      touched: {
        email: false,
        username: false
      }
    };

    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.checkUniqueEmail = this.checkUniqueEmail.bind(this);
    this.makeEmailInputClassName = this.makeEmailInputClassName.bind(this);
    this.makeUsernameInputClassName = this.makeUsernameInputClassName.bind(
      this
    );
    this.checkUniqueUsername = this.checkUniqueUsername.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate() {
    return this.form.current.reportValidity();
  }

  error() {
    if (this.state.isError) {
      return <div className="error">Error creating account</div>;
    }

    return <></>;
  }

  makeEmailInputClassName() {
    if (!this.state.touched.email) {
      return 'input-container';
    }

    if (this.state.isEmailUnique) {
      return 'input-container valid';
    }

    return 'input-container invalid';
  }

  makeUsernameInputClassName() {
    if (!this.state.touched.username) {
      return 'input-container';
    }

    if (this.state.isUsernameUnique) {
      return 'input-container valid';
    }

    return 'input-container invalid';
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
    const newUser = this.state;

    e.preventDefault();

    if (!this.validate()) {
      return;
    }

    this.props.register(newUser).then(data => {
      if (!data) {
        return this.setState({ isError: true });
      }

      this.setState({ isError: false });
      return this.props.history.push('/login');
    });
  }

  render() {
    return (
      <div className="register-wrapper">
        <div className="register-container">
          {this.error()}
          <form ref={this.form}>
            <h1>Sign Up</h1>
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
            <div className={this.makeEmailInputClassName()}>
              <input
                type="email"
                name="email"
                className="nested-input"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputOnChange}
                onKeyUp={this.checkUniqueEmail}
                required
              />
              <span className={this.state.touched.email ? 'show' : 'hide'}>
                {this.state.isEmailUnique ? 'Available!' : 'Taken'}
              </span>
            </div>
            <div className={this.makeUsernameInputClassName()}>
              <input
                type="text"
                name="username"
                className="nested-input"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleInputOnChange}
                onKeyUp={this.checkUniqueUsername}
                required
                pattern="[A-Za-z0-9_]{6,30}"
              />
              <span className={this.state.touched.username ? 'show' : 'hide'}>
                {this.state.isUsernameUnique ? 'Available!' : 'Taken'}
              </span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputOnChange}
              required
              minLength="6"
              maxLength="30"
            />

            <div className="btn-container">
              <button className="btn" onClick={this.handleSubmit}>
                Register
              </button>
            </div>
            <div className="login-here">
              {' '}
              Already have an account?
              <Link to={'/login'}> Login here</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user)),
    checkUniqueEmail: email => dispatch(checkUniqueEmail(email)),
    checkUniqueUsername: username => dispatch(checkUniqueUsername(username))
  };
};

Register = connect(
  null,
  mapDispatchToProps
)(Register);

export default Register;
