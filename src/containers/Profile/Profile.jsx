import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../actions';
import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.profile.username}</div>;
  }

  componentDidMount() {
    this.props.getProfile();
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile())
  };
};

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default Profile;
