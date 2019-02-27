import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header';

import './App.scss';

// import actions here

// placeholders for login and register components
const Login = () => {
  return <div>Login Page</div>;
};

const Register = () => {
  return <div>Register Page</div>;
};
// /placeholders

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
