import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../actions';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false,
      showMoodEntry: false
    }


    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  toggleMoodEntry = () => {
    this.setState({
      showMoodEntry: !this.state.showMoodEntry
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

                  {!this.props.email && this.props.isLoggedIn === false
                    ?
                    <Link to="/login" className="link">Login</Link>
                    :
                    <div className="link" onClick={this.handleLogout}>Logout</div>
                  }
                </div>
              )
              : (
                null
              )
          }
        </div>

        <h1 className="main-title">Mood Journal</h1>

        <Link to="/entry" className="link" id="add-btn">+</Link>
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