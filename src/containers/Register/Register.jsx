import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { register } from '../../actions'

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

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
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

  render() {
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
            onChange={this.handleInputChange}
          />

          <div>
            <label htmlFor="last_name">Last Name:</label>
          </div>
          <input
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleInputChange}
          />

          <div>
            <label htmlFor="email">Email:</label>
          </div>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <div>
            <label htmlFor="username">Username:</label>
          </div>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />

          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <div>
            <button>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
