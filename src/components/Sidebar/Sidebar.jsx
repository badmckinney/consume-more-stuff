import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = props => {
  const { currentUser } = props;

  const generateItemLinks = () => {
    return (
      <div className="item-links">
        <h3>FOR SALE</h3>
        <Link to="/items/category/apparel">
          <button>Apparel</button>
        </Link>
        <Link to="/items/category/appliances">
          <button>Appliances</button>
        </Link>
        <Link to="/items/category/automotive">
          <button>Automotive</button>
        </Link>
        <Link to="/items/category/electronics">
          <button>Electronics</button>
        </Link>
        <Link to="/items/category/furniture">
          <button>Furniture</button>
        </Link>
        <Link to="/items/category/jewelry">
          <button>Jewelry</button>
        </Link>
        <Link to="/items/category/musical_instruments">
          <button>Musical Instruments</button>
        </Link>
        <Link to="/items/category/sporting_goods">
          <button>Sporting Goods</button>
        </Link>
        <Link to="/items/all">
          <button>View All</button>
        </Link>
        <Link to="/items/category/wanted">
          <button>Wanted</button>
        </Link>
      </div>
    );
  };

  if (!currentUser) {
    return (
      <div className="logged-out-nav">
        <div className="logo">
          <Link className="link" to="/">
            <span>React</span>CMS
          </Link>
        </div>
        <div className="user-links">
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
        <div className="HL" />
        {generateItemLinks()}
      </div>
    );
  } else {
    return (
      <div className="logged-in-nav">
        <div className="logo">
          <Link className="link" to="/">
            <span>React</span>CMS
          </Link>
        </div>
        <div className="user-links">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/profile">
            <button>My Profile</button>
          </Link>
          <Link to="/messages">
            <button>Messages</button>
          </Link>
          <Link to="/create-posting">
            <button>Create a posting</button>
          </Link>
        </div>
        <div className="HL" />
        {generateItemLinks()}
      </div>
    );
  }
};

export default Sidebar;
