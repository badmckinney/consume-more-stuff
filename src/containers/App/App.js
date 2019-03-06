import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Sidebar from '../../components/Sidebar';
import Logout from '../../components/Logout';

import Header from '../Header';
import Login from '../Login';
import Register from '../Register';
import ItemEdit from '../ItemEdit';
import ItemDetail from '../ItemDetail';
import NewItem from '../NewItem';
import Category from '../Category';
import SearchDisplay from '../SearchDisplay';
import Profile from '../Profile';
import ProfileEdit from '../ProfileEdit';
import PasswordEdit from '../PasswordEdit';
import Home from '../Home';

// import actions here

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <div className="sidebar-app-container">
            <Sidebar currentUser={this.props.currentUser} />

            <div className="app-body">
              <Header />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={Register} />
              <Route path="/create-posting" component={NewItem} />
              <Route
                exact
                path="/items/category/:category"
                component={Category}
              />
              <Route exact path="/items/:id" component={ItemDetail} />
              <Route exact path="/items/:id/edit" component={ItemEdit} />
              <Route exact path="/search/:term" component={SearchDisplay} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/profile/edit" component={ProfileEdit} />
              <Route path="/password" component={PasswordEdit} />
              <Route exact path="/" component={Home} />
            </div>
          </div>
          <div className="footer">im a footerr</div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

App = connect(
  mapStateToProps,
  null
)(App);

export default App;
