import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../../components/ItemList';
import axios from 'axios';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['automotive',
        'furniture', 'appliances',
        'electronics', 'sporting goods',
        'jewelry', 'apparel', 'wanted',
        'musical instruments'],
      top_automotive: [],
      top_furniture: [],
      top_appliances: [],
      top_electronics: [],
      top_sporting_goods: [],
      top_jewelry: [],
      top_apparel: [],
      top_wanted: [],
      top_musical_instruments: []
    }
  }

  componentDidMount() {
    let automotive = axios.get('/api/items/category/automotive/top');
    let furniture = axios.get('/api/items/category/furniture/top');
    let appliances = axios.get('/api/items/category/appliances/top');
    let electronics = axios.get('/api/items/category/electronics/top');
    let sporting_goods = axios.get('/api/items/category/sporting_goods/top');
    let jewelry = axios.get('/api/items/category/jewelry/top');
    let apparel = axios.get('/api/items/category/apparel/top');
    let wanted = axios.get('/api/items/category/wanted/top');
    let musical_instruments = axios.get('/api/items/category/musical_instruments/top');

    Promise.all([automotive, furniture, appliances, electronics, sporting_goods, jewelry, apparel, wanted, musical_instruments])
      .then(values => {
        console.log(values);
      })
  }

  render() {
    return (
      <div className="home">
        <div className="apparel">
          <h2>Apparel</h2>
          <div className="top-10">
            <ItemList items={this.state.top_apparel} />
          </div>
        </div>
        <div className="appliances">
          <h2>Appliances</h2>
          <div className="top-10">
            <ItemList items={this.state.top_appliances} />
          </div>
        </div>
        <div className="automotive">
          <h2>Automotive</h2>
          <div className="top-10">
            <ItemList items={this.state.top_automotive} />
          </div>
        </div>
        <div className="electronics">
          <h2>Electronics</h2>
          <div className="top-10">
            <ItemList items={this.state.top_electronics} />
          </div>
        </div>
        <div className="furniture">
          <h2>Furniture</h2>
          <div className="top-10">
            <ItemList items={this.state.top_furniture} />
          </div>
        </div>
        <div className="jewelry">
          <h2>Jewelry</h2>
          <div className="top-10">
            <ItemList items={this.state.top_jewelry} />
          </div>
        </div>
        <div className="musical-instruments">
          <h2>Musical Instruments</h2>
          <div className="top-10">
            <ItemList items={this.state.top_musical_instruments} />
          </div>
        </div>
        <div className="sporting-goods">
          <h2>Sporting Goods</h2>
          <div className="top-10">
            <ItemList items={this.state.top_sporting_goods} />
          </div>
        </div>
        <div className="wanted">
          <h2>Wanted</h2>
          <div className="top-10">
            <ItemList items={this.state.top_wanted} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {

};

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Home;