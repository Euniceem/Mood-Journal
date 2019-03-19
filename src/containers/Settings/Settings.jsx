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
      isEmailValid: true
    }
    this.checkEmailIsValid = this.checkEmailIsValid.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitChange = this.handleSubmitChange.bind(this);
  }

  checkEmailIsValid() {
    if (this.state.email.length < 5 && this.state.email.includes('@')
      && this.state.email.includes('.com')) {
      return this.setState({ isEmailValid: true })
    } else {
      return this.setState({ isEmailValid: false })
    }
  }

  handleInputChange(e) {
    const value = e.target.name;
    console.log('value', e.target)
    switch (e.target.name) {
      case 'email':
        this.setState({ email: value })
        break;
      case 'password':
        this.setState({ password: value })
      default:
        break;
    }
  }

  handleSubmitChange(e) {
    e.preventDefault();

    const email = { email: this.state.email };
    const password = { password: this.state.password };

    if (!password) {
      this.props.editEmail(email)
        .then(() => {
          this.setState({ email: "" })
        })
        .catch((err) => {
          console.log(err)
        });
    } else {
      this.props.editEmail(email)
        .then(() => {
          this.setState({ email: "" })
        })
        .catch((err) => {
          console.log(err)
        });
      this.props.editPassword(password)
        .then(() => {
          this.setState({ password: "" })
        })
        .catch((err) => {
          console.log(err)
        });
    };
  };

  render() {
    console.log(this.props)

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
            <div className="password-container">
              <label className="password-label">Password: </label>
              <input name="password" type="password" className="password-input"
                value={this.state.password} onChange={this.handleInputChange} />

              {this.state.isEmailValid ?
                <button className="edit-user-btn" onClick={this.handleSubmitChange}>EDIT</button>
                :
                <button className="edit-user-disabled-btn" disabled>EDIT</button>
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
    onEditPassword: (editedPassword) => {
      const actionObject = editPassword(editedPassword)

      return dispatch(actionObject);
    }
  };
}

Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default Settings;