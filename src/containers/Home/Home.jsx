import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopList from '../../components/TopList';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-container">
        <h1 className="home-header">Featured Items</h1>
        <div className="categories">
          <div className="top-category">
            <div className="category-name">
              <h2>Apparel</h2>
            </div>
            <div className="top-ten">
              <TopList category="apparel" />
            </div>
          </div>
          <div className="top-category">
            <div className="category-name">
              <h2>Appliances</h2>
            </div>
            <div className="top-ten">
              <TopList category="appliances" />
            </div>
          </div>
          <div className="top-category">
            <div className="category-name">
              <h2>Automotive</h2>
            </div>
            <div className="top-ten">
              <TopList category="automotive" />
            </div>
          </div>
          <div className="top-category">
            <div className="category-name">
              <h2>Electronics</h2>
            </div>
            <div className="top-ten">
              <TopList category="electronics" />
            </div>
          </div>
          <div className="top-category">
            <div className="category-name">
              <h2>Furniture</h2>
            </div>
            <div className="top-ten">
              <TopList category="furniture" />
            </div>
          </div>
          <div className="top-category">
            <div className="category-name">
              <h2>Jewelry</h2>
            </div>
            <div className="top-ten">
              <TopList category="jewelry" />
            </div>
          </div>
          <div className="top-category">
            <div className="category-name">
              <h2>Musical Intruments</h2>
            </div>
            <div className="top-ten">
              <TopList category="musical_instruments" />
            </div>
          </div>
          <div className="top-category">
            <div className="category-name">
              <h2>Sporting Goods</h2>
            </div>
            <div className="top-ten">
              <TopList category="sporting_goods" />
            </div>
          </div>
          <div className="top-category">
            <div className="category-name">
              <h2>Wanted</h2>
            </div>
            <div className="top-ten">
              <TopList category="wanted" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Home;
