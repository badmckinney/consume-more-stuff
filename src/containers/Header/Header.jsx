import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const Login = () => {
  return <div>Login Page</div>;
};

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
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default Header;
