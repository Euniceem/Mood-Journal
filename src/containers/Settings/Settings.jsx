import React, { Component } from 'react';
import './Settings.scss';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { editEmail, editPassword } from '../../actions';

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: this.props.editEmail,
      password: "",
      newPassword: "",
      isEmailValid: false,
      isPasswordValid: false
    };

    this.checkEmailIsValid = this.checkEmailIsValid.bind(this);
    this.checkPasswordIsValid = this.checkPasswordIsValid.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProfileSubmitChange = this.handleProfileSubmitChange.bind(this);
  }

  checkEmailIsValid() {
    if (this.state.email.length < 5 && this.state.email.includes('@')
      && this.state.email.includes('.com')) {
      return this.setState({ isEmailValid: true })
    } else {
      return this.setState({ isEmailValid: false })
    }
  }

  checkPasswordIsValid() {
    if (this.state.password === this.state.newPassword && this.state.newPassword.length > 7) {
      return this.setState({ isPasswordValid: false })
    } else {
      return this.setState({ isPasswordValid: true })
    }
  }

  handleInputChange(e) {
    const value = e.target.value;
    switch (e.target.name) {
      case 'email':
        this.setState({ email: value })
        break;
      case 'password':
        this.setState({ password: value })
        break;
      case 'newPassword':
        this.setState({ newPassword: value })
        break;
      default:
        break;
    }
  }

  handleProfileSubmitChange(e) {
    e.preventDefault();

    const email = { email: this.state.email };
    const oldPassword = { password: this.state.password };
    const newPassword = { password: this.state.newPassword };

    this.props.onEditEmail(email)
      .then(() => {
        this.setState({ email: "" })
      })
      .catch((err) => {
        console.log(err)
      });
    this.props.onEditPassword(oldPassword, newPassword)
      .then(() => {
        this.setState({
          password: "",
          newPassword: ""
        })
      })
      .catch((err) => {
        console.log(err)
      });
  };

  render() {
    // console.log(this.props)
    //Tenary

    return (
      <div className="settings-container">
        <Header />
        <div className="title-container">
          <h1 className="settings-title">Settings</h1>
        </div>

        <div className="user-profile-edit-container">
          <h2 className="user-title">Edit Profile</h2>
          <form className="user-form">
            <div className="email-container">
              <label className="email-label">Email:</label>
              <input name="email" type="text" className="email-input" placeholder={this.state.email}
                onKeyUp={this.checkEmailIsValid} value={this.state.email} onChange={this.handleInputChange} />
            </div>
            <div className="old-password-container">
              <label className="password-label">Current Password: </label>
              <input name="password" type="password" className="password-input"
                value={this.state.password} onChange={this.handleInputChange} />
            </div>
            <div className="new-password-container">
              <label className="new-password-label">New Password</label>
              <input name="newPassword" type="password" className="new-password-input"
                value={this.state.newPassword} onChange={this.handleInputChange} />
              {this.state.isEmailValid ?
                <button className="edit-user-disabled-btn" disabled>EDIT</button>
                :
                <button className="edit-user-btn" onClick={this.handleProfileSubmitChange}>EDIT</button>
              }
            </div>
          </form>
        </div>

        <div className="edit-homepage">
          <h2 className="homepage-title">Change Homepage view</h2>
          <div className="homepage-btn-container">
            <button className="data-btn">Data</button>
            <button className="feed-btn">Feed</button>
            <button className="calendar-btn">Calendar</button>
          </div>
        </div>

        <div className="done-btn-container">
          <button className="done-btn">Done</button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editEmail: state.email
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditEmail: (editedUser) => {
      const actionObject = editEmail(editedUser);

      return dispatch(actionObject);
    },
    onEditPassword: (oldPassword, editedPassword) => {
      const actionObject = editPassword(oldPassword, editedPassword)

      return dispatch(actionObject);
    }
  };
}

Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default Settings;