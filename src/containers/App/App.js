import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import Header from '../Header';
import Sidebar from '../../components/Sidebar';
import NewPost from '../NewPost';

import './App.scss';

// import actions here

// placeholders for login and register components
const Login = () => {
  return <div>Login Page</div>;
};

const Register = () => {
  return <div>Register Page</div>;
};

const createNewPost = () => {
  return <NewPost />
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
        <Route path="/" component={Login} />
        <Route path="/profile" component={Login} />
        <Route path="/messages" component={Login} />
        <Route path="/items/new" component={createNewPost} />
        <Route path="/items" component={Login} />
        <Route path="/category/:category" component={Login} />
      </div>
    );
  }
}

export default App;
