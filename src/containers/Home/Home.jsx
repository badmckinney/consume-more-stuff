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
      <div className="home">
        <div className="apparel">
          <h2>Apparel</h2>
          <div className="top-10">
            <TopList category="apparel" />
          </div>
        </div>
        <div className="appliances">
          <h2>Appliances</h2>
          <div className="top-10">
            <TopList category="appliances" />
          </div>
        </div>
        <div className="automotive">
          <h2>Automotive</h2>
          <div className="top-10">
            <TopList category="automotive" />
          </div>
        </div>
        <div className="electronics">
          <h2>Electronics</h2>
          <div className="top-10">
            <TopList category="electronics" />
          </div>
        </div>
        <div className="furniture">
          <h2>Furniture</h2>
          <div className="top-10">
            <TopList category="furniture" />
          </div>
        </div>
        <div className="jewelry">
          <h2>Jewelry</h2>
          <div className="top-10">
            <TopList category="jewelry" />
          </div>
        </div>
        <div className="musical-instruments">
          <h2>Musical Instruments</h2>
          <div className="top-10">
            <TopList category="musical_instruments" />
          </div>
        </div>
        <div className="sporting-goods">
          <h2>Sporting Goods</h2>
          <div className="top-10">
            <TopList category="sporting_goods" />
          </div>
        </div>
        <div className="wanted">
          <h2>Wanted</h2>
          <div className="top-10">
            <TopList category="wanted" />
          </div>
        </div>
      </div>
    )
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