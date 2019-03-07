import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../actions';
import { connect } from 'react-redux';
import './Register.scss';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: ''
    };

    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
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
            <div>
              <label htmlFor="first_name">First Name:</label>
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
              <label htmlFor="last_name">Last Name:</label>
            </div>
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputOnChange}
              required
              pattern="[A-Za-z]{1,30}"
            />

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
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputOnChange}
              required
              minLength="6"
              maxLength="30"
            />

            <div className="login-here">
              {' '}
              Already have an account?
              <Link to={'/login'}> Login here</Link>
            </div>

            <div className="btn-container">
              <button className="btn" onClick={this.handleSubmit}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user))
  };
};

Register = connect(
  null,
  mapDispatchToProps
)(Register);

export default Register;
