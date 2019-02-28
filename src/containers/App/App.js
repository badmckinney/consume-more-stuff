import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import Header from '../Header';
import Sidebar from '../../components/Sidebar';

import './App.scss';

// import actions here

// placeholders for login and register components
const Login = () => {
  return <div>Login Page</div>;
};

const Register = () => {
  return <div>Register Page</div>;
};

const AddPost = () => {
  return <div> Create New Post Page</div>
}
// /placeholders

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={AddPost} />
        <Route path="/profile" component={Login} />
        <Route path="/messages" component={Login} />
        <Route path="/items/new" component={Login} />
        <Route path="/items" component={Login} />
        <Route path="/category/:category" component={Login} />
      </div>
    );
  }
}

export default App;
