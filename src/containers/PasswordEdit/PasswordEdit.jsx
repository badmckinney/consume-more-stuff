import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PasswordEdit.scss';

import { changePassword } from '../../actions';

class PasswordEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      incorrectPw: false,
      nonMatch: false,

      old: '',
      new: '',
      confirm: '',

      oldWording: 'show',
      newWording: 'show',
      confirmWording: 'show',

      oldType: 'password',
      newType: 'password',
      confirmType: 'password'
    };

    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate() {
    return this.form.current.reportValidity();
  }

  error() {
    if (this.state.incorrectPw) {
      return <div>incorrect password</div>;
    } else if (this.state.nonMatch) {
      return <div>passwords did not match</div>;
    } else if (this.state.isError) {
      return <div>error updating password</div>;
    }
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    return this.setState({ [name]: value });
  }

  handleToggle(e) {
    const inputName = e.target.dataset.name;
    let isPassword = this.state[`${inputName}Type`] === 'password';

    return this.setState({
      [`${inputName}Wording`]: isPassword ? 'hide' : 'show',
      [`${inputName}Type`]: isPassword ? 'text' : 'password'
    });
  }

  handleSubmit(e) {
    const update = this.state;

    if (!this.validate()) {
      return;
    }

    this.setState({
      incorrectPw: false,
      nonMatch: false,
      isError: false
    });

    e.preventDefault();
    this.props.changePassword(update).then(data => {
      switch (data) {
        case 'not-auth':
          return this.setState({ incorrectPw: true });
        case 'non-match':
          return this.setState({ nonMatch: true });
        case 'error':
          return this.setState({ isError: true });
        case 'success':
          this.props.toggleMsg('passwordUpdated');
          return this.props.history.push('/profile');
        default:
          return;
      }
    });

    return this.setState({
      old: '',
      new: '',
      confirm: ''
    });
  }

  render() {
    return (
      <div className="change-password-container">
        {this.error()}

        <form className="form-container" ref={this.form}>
          <div className="input-container">
            <input
              type={this.state.oldType}
              name="old"
              value={this.state.old}
              className="nested-input"
              placeholder="Old password"
              onChange={this.handleInputOnChange}
              required
              minLength="6"
              maxLength="30"
            />
            <span
              className="pw-toggle"
              data-name="old"
              onClick={this.handleToggle}
            >
              {this.state.oldWording}
            </span>
          </div>

          <div className="input-container">
            <input
              type={this.state.newType}
              name="new"
              value={this.state.new}
              placeholder="New Password"
              className="nested-input"
              onChange={this.handleInputOnChange}
              required
              minLength="6"
              maxLength="30"
            />
            <span
              className="pw-toggle"
              data-name="new"
              onClick={this.handleToggle}
            >
              {this.state.newWording}
            </span>
          </div>

          <div className="input-container">
            <input
              type={this.state.confirmType}
              name="confirm"
              value={this.state.confirm}
              className="nested-input"
              placeholder="Confirm password"
              onChange={this.handleInputOnChange}
              required
              minLength="6"
              maxLength="30"
            />
            <span
              className="pw-toggle"
              data-name="confirm"
              onClick={this.handleToggle}
            >
              {this.state.confirmWording}
            </span>
          </div>

          <div className="button-container">
            <button className="btn" onClick={this.handleSubmit}>
              Change Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: update => dispatch(changePassword(update))
  };
};

PasswordEdit = connect(
  null,
  mapDispatchToProps
)(PasswordEdit);

export default PasswordEdit;
