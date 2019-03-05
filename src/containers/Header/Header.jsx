import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import HeaderLogin from '../../components/HeaderLogin';
import { logout, searchItems } from '../../actions';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };

    this.logout = this.logout.bind(this);
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logout() {
    axios.post('/api/logout', null).then(res => {
      if (res.data.success) {
        this.props.dispatchLogout();
        this.props.history.push('/');
      }

      //error handling
    });
  }

  handleSearchOnChange(e) {
    let value = e.target.value;
    this.setState({
      searchTerm: value
    });
  }

  handleSubmit(e) {
    const { searchTerm } = this.state;
    e.preventDefault();
    this.props.searchItems(searchTerm).then(() => {
      this.props.history.push(`/search/${searchTerm}`);
    });
  }

  render() {
    return (
      <div className="header">
        <form className="search-form">
          <input placeholder="Search items..."
            type="text"
            className="search-bar"
            value={this.state.search}
            onChange={this.handleSearchOnChange}
          />

          <button className="search-button" onClick={this.handleSubmit}>
            Search
          </button>
        </form>

        <HeaderLogin
          currentUser={this.props.currentUser}
          logout={this.logout}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogout: () => {
      dispatch(logout());
    },

    searchItems: term => {
      return dispatch(searchItems(term));
    }
  };
};

Header = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);

export default Header;
