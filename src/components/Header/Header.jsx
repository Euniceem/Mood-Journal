import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../actions';
import { slide as Menu } from 'react-burger-menu'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';
import { faUserCog, faHome, faSignOutAlt, faSignInAlt, faSmileBeam, faSmile, faMeh, faFrown, faSadTear } from '@fortawesome/free-solid-svg-icons';
import { faSmileBeam as faSmileBeanRegular, faSmile as faSmileRegular, faMeh as faMehRegular, faFrown as faFrownRegular, faSadTear as faSadTearRegular } from '@fortawesome/free-regular-svg-icons';

library.add(faHome);
library.add(faUserCog);
library.add(faSignOutAlt);
library.add(faSignInAlt);

//Moods
//Amazing
library.add(faSmileBeam, faSmileBeanRegular);
//Good
library.add(faSmile, faSmileRegular);
//Ok
library.add(faMeh, faMehRegular);
//Bad
library.add(faFrown, faFrownRegular);
//Awful
library.add(faSadTear, faSadTearRegular);

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
    }

    this.closeMenu = this.closeMenu.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  handleLogout(e) {
    e.preventDefault();

    this.props.logout()
      .then(() => {

        this.props.history.push('/login');
      })
  }

  render() {

    return (
      <div className="header-container" >
        <div className="nav-menu-container">
          <div className="menu-icon" onClick={() => this.toggleMenu()}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {this.state.menuOpen ?
            <Menu className="dropMenu"
              isOpen={this.state.menuOpen}
              onStateChange={(state) => this.handleStateChange(state)}
            >
              <div className="main-title-container">
                <h1 className="main-title">Mood Catcher</h1>
                <div className="emotion-icon-container">

                  <div className="emotion">
                    <FontAwesomeIcon id="fa-amazing" className="mood" icon={["far", "smile-beam"]} />
                  </div>
                  <div className="emotion">
                    <FontAwesomeIcon id="fa-good" className="mood" icon={["far", "smile"]} />
                  </div>
                  <div className="emotion">
                    <FontAwesomeIcon id="fa-ok" className="mood" icon={["far", "meh"]} />
                  </div>
                  <div className="emotion">
                    <FontAwesomeIcon id="fa-bad" className="mood" icon={["far", "frown"]} />
                  </div>
                  <div className="emotion">
                    <FontAwesomeIcon id="fa-awful" className="mood" icon={["far", "sad-tear"]} />
                  </div>
                </div>
              </div>
              <h3 className="username">Aloha </h3>
              <h3 className="email">{this.props.email}</h3>
              <div className="settings-links">
                <div className="home-container">

                  <div className="home-icon">
                    <FontAwesomeIcon id="fa-home" className="link" icon="home" />
                  </div>
                  <div className="home-link">
                    <Link to="/" className="link" onClick={() => this.closeMenu()}>Home</Link>
                  </div>
                </div>
                <div className="settings-icon-container">
                  <div className="settings-icon">
                    <FontAwesomeIcon id="fa-settings" className="link" icon="user-cog" />
                  </div>
                  <div className="settings-link">
                    <Link to="/settings" className="link" onClick={() => this.closeMenu()}>Settings</Link>
                  </div>
                </div>

                {!this.props.email && this.props.isLoggedIn === false
                  ?
                  <div className="login-container">
                    <div className="login-icon">
                      <FontAwesomeIcon id="fa-login" className="link" icon="sign-in-alt" />
                    </div>
                    <div className="login-link">
                      <Link to="/login" className="link" onClick={() => this.closeMenu()}>Login</Link>
                    </div>
                  </div>
                  :
                  <div className="logout-container">
                    <div className="logout-icon">
                      <FontAwesomeIcon id="fa-logout" className="link" icon="sign-out-alt" />
                    </div>
                    <div className="logout-link">
                      <div className="link" onClick={this.handleLogout}>Logout</div>
                    </div>
                  </div>
                }
              </div>
            </Menu>
            : null}
        </div>

        <h1 className="main-title">Mood Catcher</h1>

        <Link to="/entry" className="link" id="add-btn" onClick={this.props.resetStateOnClick}>+</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    email: state.email,
    isLoggedIn: state.loggedIn,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: user => {
      return dispatch(logout(user))
    }
  }
}

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default withRouter(Header);