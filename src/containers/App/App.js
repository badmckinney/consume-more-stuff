import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

// import actions here

//Component for router test
const Home = () => {
  return (
    <div>
      <h1> Home</h1>
    </div>
  );
};

const Test = () => {
  return (
    <div>
      <h1> Test</h1>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/test">test</Link>

        <Route path="/" exact component={Home} />
        <Route path="/test" component={Test} />
      </div>
    );
  }
}

export default App;
