import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogin = props => {
  const { currentUser, logout } = props;

  if (!currentUser) {
    return (
      <div className="logged-out">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
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
