import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Sidebar from '../../components/Sidebar';

import Header from '../Header';
import Login from '../Login';
import Register from '../Register';
import ItemEdit from '../ItemEdit';

// import actions here

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <ItemEdit />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/items/:id/edit" component={ItemEdit} />
        {/* <Route path="/" component={} />
        <Route path="/profile" component={} />
        <Route path="/messages" component={} />
        <Route path="/items/new" component={} />
        <Route path="/items" component={} />
        <Route path="/category/:category" component={} /> */}
      </div>
    );
  }
}

export default App;
