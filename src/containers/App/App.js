import React, { Component } from 'react';
<<<<<<< HEAD
import { Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import Header from '../Header';
import Sidebar from '../../components/Sidebar';
import NewPost from '../NewPost';

=======
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
>>>>>>> dev
import './App.scss';

import Sidebar from '../../components/Sidebar';

import Header from '../Header';
import Login from '../Login';
import Register from '../Register';

<<<<<<< HEAD
const Register = () => {
  return <div>Register Page</div>;
};

const createNewPost = () => {
  return <NewPost />
}
// /placeholders
=======
// import actions here
>>>>>>> dev

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
<<<<<<< HEAD
        <Route path="/" component={Login} />
        <Route path="/profile" component={Login} />
        <Route path="/messages" component={Login} />
        <Route path="/items/new" component={createNewPost} />
        <Route path="/items" component={Login} />
        <Route path="/category/:category" component={Login} />
=======
        {/* <Route path="/" component={} />
        <Route path="/profile" component={} />
        <Route path="/messages" component={} />
        <Route path="/items/new" component={} />
        <Route path="/items" component={} />
        <Route path="/category/:category" component={} /> */}
>>>>>>> dev
      </div>
    );
  }
}

export default App;
