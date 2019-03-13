import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false
    }

    this.dropMenu = this.dropMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this);
  }

  dropMenu(e) {
    e.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(e) {
    if (!this.dropdownMenu.contains(e.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }


  render() {

    return (
      <div className="header-container">
        <div className="nav-menu-container">
          <div className="menu-icon" onClick={this.dropMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {
            this.state.showMenu
              ? (
                <div className="menu" ref={(element) => {
                  this.dropdownMenu = element;
                }}>
                  <div className="link">Home</div>
                  <div className="link">Settings</div>
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