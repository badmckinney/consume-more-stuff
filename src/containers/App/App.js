import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Sidebar from '../../components/Sidebar';
import Logout from '../../components/Logout';
import Footer from '../../components/Footer';

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevPath: '',
      isMessage: {
        addItem: false,
        editItem: false,
        editItemStatus: false,
        editProfile: false,
        registered: false,
        passwordUpdated: false
      }
    };

    this.toggleMsg = this.toggleMsg.bind(this);
  }

  toggleMsg(msg) {
    console.log('hit app');
    this.setState({
      isMessage: { ...this.state.isMessage, [msg]: !this.state.isMessage[msg] }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location });
    }
  }

  render() {
    return (
      <Router>
        <div className="app-container">
          <div className="sidebar-app-container">
            <Sidebar currentUser={this.props.currentUser} />

            <div className="app-body">
              <Header />
              <Route
                path="/login"
                render={props => (
                  <Login
                    {...props}
                    toggleMsg={this.toggleMsg}
                    isRegisteredMsg={this.state.isMessage.registered}
                  />
                )}
              />
              <Route path="/logout" component={Logout} />
              <Route
                path="/register"
                render={props => (
                  <Register {...props} toggleMsg={this.toggleMsg} />
                )}
              />
              />
              <Route
                path="/create-posting"
                render={props => (
                  <NewItem {...props} toggleMsg={this.toggleMsg} />
                )}
              />
              <Route
                exact
                path="/items/category/:category"
                component={Category}
              />
              <Route
                exact
                path="/items/:id"
                render={props => (
                  <ItemDetail
                    {...props}
                    toggleMsg={this.toggleMsg}
                    isMessages={this.state.isMessage}
                  />
                )}
              />
              <Route
                exact
                path="/items/:id/edit"
                render={props => (
                  <ItemEdit {...props} toggleMsg={this.toggleMsg} />
                )}
              />
              <Route exact path="/search/:term" component={SearchDisplay} />
              <Route
                exact
                path="/profile"
                render={props => (
                  <Profile
                    {...props}
                    toggleMsg={this.toggleMsg}
                    isMessages={this.state.isMessage.registered}
                  />
                )}
              />
              <Route path="/profile/edit" component={ProfileEdit} />
              <Route path="/password" component={PasswordEdit} />
              <Route exact path="/" component={Home} />
            </div>
          </div>
          <Footer />
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
