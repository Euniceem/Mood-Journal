import React, { Component } from 'react';
import './Settings.scss';
import Header from '../../components/Header';

class Settings extends Component {
  constructor(props) {
    super(props)

    //DummyData
    this.state = {
      email: "octocat@gmail.com",
    }
  }

  render() {

    return (
      <div className="settings-container">
        <Header />
        <div className="title-container">
          <h1 className="settings-title">Settings</h1>
        </div>

        <div className="user-profile-edit-container">
          <h2 className="user-title">Edit Profile</h2>
          <form className="user-form">
            <label className="email-label">Email:</label>
            <input type="text" className="email-input" placeholder={this.state.email} />
            <button className="edit-user-btn">EDIT</button>
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

export default Settings;