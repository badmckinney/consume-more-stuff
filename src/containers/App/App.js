import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header';
import Sidebar from '../../components/Sidebar';
import Category from '../../containers/Category';

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
        <Sidebar />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* <Route path="/" component={} />
        <Route path="/profile" component={} />
        <Route path="/messages" component={} />
        <Route path="/items/new" component={} />
        <Route path="/items" component={} /> */}
        <Route path="/items/category/:category" component={Category} />
      </div>
    );
  }
}

export default App;
