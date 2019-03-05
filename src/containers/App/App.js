import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Sidebar from '../../components/Sidebar';

import Header from '../Header';
import Login from '../Login';
import Register from '../Register';
import ItemEdit from '../ItemEdit';
import ItemDetail from '../ItemDetail';
import NewItem from '../NewItem';
import Category from '../Category';
import SearchDisplay from '../../components/SearchDisplay';
import Home from '../Home';

// import actions here

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Sidebar currentUser={this.props.currentUser} />
          <div className="app">
            <Header />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/items/new" component={NewItem} />
            <Route path="/items/category/:category" component={Category} />
            <Route path="/items/:id/edit" component={ItemEdit} />
            <Route path="/items/:id/details" component={ItemDetail} />
            <Route
              path="/search/:term"
              render={props => (
                <SearchDisplay
                  {...props}
                  searchResults={this.props.searchResults}
                />
              )}
            />
            <Route exact path="/" component={Home} />
          </div>
        </>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    searchResults: state.searchResults
  };
};

App = connect(
  mapStateToProps,
  null
)(App);

export default App;
