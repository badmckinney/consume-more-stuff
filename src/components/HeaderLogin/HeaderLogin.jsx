import React from 'react';
import { Route, Link } from 'react-router-dom';

const Login = () => {
  return <div>Login Page</div>;
};

const Register = () => {
  return <div>Register Page</div>;
};

const HeaderLogin = props => {
  const { currentUser, logout } = props;

  console.log(currentUser);

  if (!currentUser) {
    return (
      <div className="logged-out">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
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
