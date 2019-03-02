import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: ''
    };

    this.register = this.register.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  register(newUser) {
    axios.post('/api/register', newUser).then(res => {
      if (res.data.success) {
        this.setState({
          redirect: true
        });
      }
      // error handling;
    });
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'first_name':
        return this.setState({ first_name: value });
      case 'last_name':
        return this.setState({ last_name: value });
      case 'email':
        return this.setState({ email: value });
      case 'username':
        return this.setState({ username: value });
      case 'password':
        return this.setState({ password: value });
      default:
        return;
    }
  }

  handleSubmit(e) {
    const newUser = this.state;

    e.preventDefault();
    this.register(newUser);
  }

  render() {
    if (this.state.redirect) {
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

export default Register;
