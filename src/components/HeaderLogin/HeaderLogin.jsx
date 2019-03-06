import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderLogin.scss';

const HeaderLogin = props => {
  const { currentUser, logout } = props;

  if (!currentUser) {
    return (
      <div className="logged-out">
        <Link className="link" to="/login">
          <button className="btn">Login</button>
        </Link>

        <Link className="link" to="/register">
          <button className="btn">Register</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="logged-in">
        Welcome, {currentUser}
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
};

export default HeaderLogin;
