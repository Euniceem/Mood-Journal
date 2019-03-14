import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false
    }

    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {

    return (
      <div className="header-container">
        <div className="nav-menu-container">
          <div className="menu-icon" onClick={this.handleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {
            this.state.showMenu
              ? (
                <div className="menu"
                >
                  <Link to="/feed" className="link">Home</Link>
                  <Link to="/settings" className="link">Settings</Link>
                  <Link to="/login" className="link">Login</Link>
                  <div className="link">Logout</div>
                </div>
              )
              : (
                null
              )
          }
        </div>

        <h1 className="main-title">Mood Journal</h1>

        <div className="add-btn">+</div>
      </div>
    )
  }
}

export default Header;