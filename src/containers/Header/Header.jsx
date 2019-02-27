import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderLogin from '../../components/HeaderLogin';
import { logout } from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchOnChange(e) {
    let value = e.target.value;
    this.setState({
      search: value
    });
  }

  handleSubmit(e) {
    const { search } = this.state;

    e.preventDefault();
    // this.props.search(search)
    // this.setState({
    //   search: ''
    // })
  }

  render() {
    return (
      <div className="header">
        <div>LOGO</div>
        <form className="search-form">
          <input
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
          logout={this.props.logout}
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
    logout: () => {
      dispatch(logout());
    }
  };
};

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default Header;
