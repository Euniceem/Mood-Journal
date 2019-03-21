import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = (props) => {
  return (

    <footer className="navigation-container">

      {props.setHomePage === "calendar" ?
        <div className="navbar">
          <div className="data">
            <Link to="/data" className="link"> DATA</Link>
          </div>

          <div id="home" className="calendar">
            <Link to="/calendar" className="link"> CALENDAR </Link>
          </div>

          <div className="feed">
            <Link to="/feed" className="link"> FEED </Link>
          </div>
        </div>
        : null
      }

      {props.setHomePage === "feed" ?
        <div className="navbar">
          <div className="data">
            <Link to="/data" className="link"> DATA</Link>
          </div>

          <div id="home" className="feed">
            <Link to="/feed" className="link"> FEED </Link>
          </div>

          <div className="calendar">
            <Link to="/calendar" className="link"> CALENDAR </Link>
          </div>
        </div>
        : null
      }

      {props.setHomePage === "data" ?
        <div className="navbar">
          <div className="feed">
            <Link to="/feed" className="link"> FEED </Link>
          </div>

          <div id="home" className="data">
            <Link to="/data" className="link"> DATA</Link>
          </div>

          <div className="calendar">
            <Link to="/calendar" className="link"> CALENDAR </Link>
          </div>
        </div>
        : null
      }

      {props.setHomePage === null ?
        <div className="navbar">
          <div className="data">
            <Link to="/data" className="link"> DATA</Link>
          </div>

          <div id="home" className="feed">
            <Link to="/feed" className="link"> FEED </Link>
          </div>

          <div className="calendar">
            <Link to="/calendar" className="link"> CALENDAR </Link>
          </div>
        </div>
        : null
      }

    </footer>
  )
}

export default Navigation;