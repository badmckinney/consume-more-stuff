import React from 'react';
import {Link } from 'react-router-dom';
import "./Logout.scss";

const Logout = () => {
  return (
    <div className="logout-container">
    <div className="logout-success">You have successfully been logged out.</div>

    <div className="go-home">
    <Link className="link" to={"/"}>  Click Here to go home </Link> </div>
    </div>
  );
};

export default Logout;
