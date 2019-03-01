import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Sidebar from '../../components/Sidebar';

import Header from '../Header';
import Login from '../Login';
import Register from '../Register';
import ItemDetail from '../ItemDetail';
import NewItem from '../NewItem';
import Category from '../Category';

// import actions here

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />

        <NewItem />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/items/:id/details" component={ItemDetail}/>
        <Route path="/items/new" component={NewItem} />
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
